// Local admin panel — runs ONLY on your laptop:  npm run admin  →  http://localhost:4000/admin
// Edits data/projects.json + public/images/projects/, logs activity, and can run the build.
// Nothing here is copied into dist/, so the live site stays 100% static.
import http from "node:http";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from "node:fs";
import { join, extname, normalize, dirname } from "node:path";
import { spawn, exec } from "node:child_process";
import { fileURLToPath } from "node:url";
import "./env.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA = join(ROOT, "data", "projects.json");
const LOG = join(ROOT, "data", "admin-activity.json");
const IMG_DIR = join(ROOT, "public", "images", "projects");
const UI = join(ROOT, "scripts", "admin", "index.html");
const PORT = Number(process.env.ADMIN_PORT || 4000);
const EMAIL = (process.env.ADMIN_EMAIL || "gorealtyhyd@gmail.com").toLowerCase();
const PASSWORD = process.env.ADMIN_PASSWORD || "Gorealty408";
const sessions = new Map(); // token → email

const MIME = { ".html": "text/html; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".gif": "image/gif" };
const readJson = (f, d) => (existsSync(f) ? JSON.parse(readFileSync(f, "utf8")) : d);
const writeProjects = (list) => {
  if (existsSync(DATA)) copyFileSync(DATA, DATA + ".bak");
  writeFileSync(DATA, "[\n" + list.map((p) => "  " + JSON.stringify(p)).join(",\n") + "\n]\n");
};
const log = (email, action, detail = "", req) => {
  const l = readJson(LOG, []);
  l.unshift({ at: new Date().toISOString(), email, action, detail, device: (req?.headers["user-agent"] || "").slice(0, 160) });
  writeFileSync(LOG, JSON.stringify(l.slice(0, 500), null, 2));
};
const same = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && timingSafeEqual(x, y); };
const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const send = (res, code, body, type = "application/json") => {
  res.writeHead(code, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(type === "application/json" ? JSON.stringify(body) : body);
};
const body = (req) => new Promise((ok, bad) => {
  let s = ""; req.on("data", (c) => { s += c; if (s.length > 25e6) { bad(new Error("Too large")); req.destroy(); } });
  req.on("end", () => { try { ok(s ? JSON.parse(s) : {}); } catch (e) { bad(e); } });
});
const who = (req) => { const t = (req.headers.cookie || "").match(/gzadmin=([a-f0-9]+)/)?.[1]; return t && sessions.get(t); };

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const p = url.pathname;
  try {
    if (p === "/" ) { res.writeHead(302, { Location: "/admin" }); return res.end(); }
    if (p === "/admin" || p === "/admin/") return send(res, 200, readFileSync(UI, "utf8"), MIME[".html"]);
    if (p.startsWith("/images/")) {
      const f = normalize(join(ROOT, "public", p));
      if (!f.startsWith(join(ROOT, "public")) || !existsSync(f)) return send(res, 404, "Not found", "text/plain");
      res.writeHead(200, { "Content-Type": MIME[extname(f).toLowerCase()] || "application/octet-stream" });
      return res.end(readFileSync(f));
    }

    if (p === "/api/login" && req.method === "POST") {
      const { email, password } = await body(req);
      if (!same(String(email || "").trim().toLowerCase(), EMAIL) || !same(password || "", PASSWORD)) {
        log(String(email || ""), "failed login", "", req);
        return send(res, 401, { error: "Incorrect email or password." });
      }
      const t = randomBytes(24).toString("hex");
      sessions.set(t, EMAIL);
      log(EMAIL, "login", "", req);
      res.setHeader("Set-Cookie", `gzadmin=${t}; HttpOnly; SameSite=Strict; Path=/`);
      return send(res, 200, { email: EMAIL });
    }

    const user = who(req);
    if (p === "/api/me") return user ? send(res, 200, { email: user }) : send(res, 401, { error: "Not signed in" });
    if (p.startsWith("/api/") && !user) return send(res, 401, { error: "Not signed in" });

    if (p === "/api/logout" && req.method === "POST") {
      const t = (req.headers.cookie || "").match(/gzadmin=([a-f0-9]+)/)?.[1]; sessions.delete(t);
      log(user, "logout", "", req);
      res.setHeader("Set-Cookie", "gzadmin=; Max-Age=0; Path=/");
      return send(res, 200, { ok: true });
    }
    if (p === "/api/projects" && req.method === "GET") return send(res, 200, readJson(DATA, []));
    if (p === "/api/projects" && req.method === "PUT") {
      const { projects, action, detail } = await body(req);
      if (!Array.isArray(projects)) return send(res, 400, { error: "Bad data" });
      const seen = new Set();
      for (const x of projects) {
        x.slug = x.slug || slugify(`${x.name}-${x.area}`);
        while (seen.has(x.slug)) x.slug += "-2";
        seen.add(x.slug);
      }
      writeProjects(projects);
      log(user, action || "save", detail || "", req);
      return send(res, 200, { ok: true, projects });
    }
    if (p === "/api/upload" && req.method === "POST") {
      const { name, dataUrl } = await body(req);
      const m = String(dataUrl || "").match(/^data:image\/(png|jpe?g|webp);base64,(.+)$/);
      if (!m) return send(res, 400, { error: "Use a PNG, JPG or WebP image." });
      mkdirSync(IMG_DIR, { recursive: true });
      const file = `${slugify(name || "project") || "project"}-${Date.now()}.${m[1] === "jpeg" ? "jpg" : m[1]}`;
      writeFileSync(join(IMG_DIR, file), Buffer.from(m[2], "base64"));
      log(user, "image upload", file, req);
      return send(res, 200, { path: `/images/projects/${file}` });
    }
    if (p === "/api/activity") return send(res, 200, readJson(LOG, []));
    if (p === "/api/build" && req.method === "POST") {
      log(user, "build", "npm run build", req);
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
      const child = spawn(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "build"], { cwd: ROOT, shell: process.platform === "win32" });
      child.stdout.on("data", (d) => res.write(d));
      child.stderr.on("data", (d) => res.write(d));
      child.on("close", (code) => res.end(code === 0 ? "\n__BUILD_OK__\n" : `\n__BUILD_FAILED__ (${code})\n`));
      return;
    }
    send(res, 404, { error: "Not found" });
  } catch (e) {
    send(res, 500, { error: String(e.message || e) });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  const u = `http://localhost:${PORT}/admin`;
  console.log(`\n✓ GoZamindar admin running → ${u}\n  (Ctrl+C to stop)\n`);
  const open = process.platform === "win32" ? `start "" "${u}"` : process.platform === "darwin" ? `open "${u}"` : `xdg-open "${u}"`;
  exec(open, () => {});
});
