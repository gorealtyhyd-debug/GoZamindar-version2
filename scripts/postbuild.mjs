// Turns Next's static export (out/) into a Hostinger-ready dist/:
//
//   dist/
//   ├── index.html        ← the whole site (pre-rendered HTML, SEO tags, JSON-LD)
//   ├── 404.html
//   ├── .htaccess
//   ├── assets/           ← all JS, CSS, fonts (from _next/static) + images
//   │   ├── static/…
//   │   └── images/…
//   ├── robots.txt  sitemap.xml  llms.txt  manifest.webmanifest
//   └── icon.png  apple-icon.png  favicon.ico
//
// 100% static — no PHP, no Node server, no API routes.
import { cpSync, rmSync, existsSync, copyFileSync, readdirSync, statSync, readFileSync, writeFileSync, renameSync, mkdirSync } from "node:fs";
import { join, extname } from "node:path";

const OUT = "out", DIST = "dist";
if (!existsSync(OUT)) { console.error("✗ out/ not found — is output:'export' set in next.config.mjs?"); process.exit(1); }

rmSync(DIST, { recursive: true, force: true });
cpSync(OUT, DIST, { recursive: true });
rmSync(OUT, { recursive: true, force: true });

// 1. _next/ → assets/   and   images/ → assets/images/
const ASSETS = join(DIST, "assets");
mkdirSync(ASSETS, { recursive: true });
if (existsSync(join(DIST, "_next"))) {
  for (const f of readdirSync(join(DIST, "_next"))) renameSync(join(DIST, "_next", f), join(ASSETS, f));
  rmSync(join(DIST, "_next"), { recursive: true, force: true });
}
if (existsSync(join(DIST, "images"))) {
  cpSync(join(DIST, "images"), join(ASSETS, "images"), { recursive: true });
  rmSync(join(DIST, "images"), { recursive: true, force: true });
}

// 2. Rewrite every reference
const TEXT = new Set([".html", ".js", ".css", ".txt", ".xml", ".json", ".webmanifest", ".map"]);
const rewrite = (s) => s
  .replace(/\/_next\//g, "/assets/")
  .replace(/(["'(\s=,:]|\\")\/images\//g, "$1/assets/images/")
  .replace(/(https?:\/\/[^"'\s<>)]+?)\/images\//g, "$1/assets/images/");
for (const file of walk(DIST)) {
  if (!TEXT.has(extname(file))) continue;
  const src = readFileSync(file, "utf8");
  const out = rewrite(src);
  if (out !== src) writeFileSync(file, out);
}

// 3. Extras
copyFileSync("deploy/.htaccess", join(DIST, ".htaccess"));
if (!existsSync(join(DIST, "404.html")) && existsSync(join(DIST, "404", "index.html")))
  copyFileSync(join(DIST, "404", "index.html"), join(DIST, "404.html"));
for (const d of ["404", "_not-found"]) rmSync(join(DIST, d), { recursive: true, force: true });
// RSC payloads — only used for client-side route changes; this is a single page
for (const f of ["index.txt", "404.txt", "_not-found.txt"]) rmSync(join(DIST, f), { force: true });

// 4. Sanity checks
const html = readFileSync(join(DIST, "index.html"), "utf8");
const left = html.match(/\/_next\/[^"')\s]+/g);
if (left) console.warn("⚠ still referencing /_next/:", [...new Set(left)].slice(0, 5).join(", "));
const server = walk(DIST).filter((f) => /\.(php|cgi|py|rb|sh)$/i.test(f));
if (server.length) { console.error("✗ server-side files found in dist/:", server.join(", ")); process.exit(1); }

const required = ["index.html", "404.html", ".htaccess", "robots.txt", "sitemap.xml", "llms.txt", "assets/images/logo.png"];
const missing = required.filter((f) => !existsSync(join(DIST, f)));
if (missing.length) { console.error("✗ dist/ is missing:", missing.join(", ")); process.exit(1); }

const js = walk(ASSETS).filter((f) => f.endsWith(".js")).length;
const css = walk(ASSETS).filter((f) => f.endsWith(".css")).length;
const imgs = walk(join(ASSETS, "images")).length;
console.log(`\n✓ dist/ ready — index.html (${(statSync(join(DIST, "index.html")).size / 1024).toFixed(0)} KB), assets/ (${js} JS, ${css} CSS, ${imgs} images), 404.html, .htaccess, robots.txt, sitemap.xml, llms.txt`);
console.log("  Preview: npm run preview   ·   Upload the CONTENTS of dist/ (incl. hidden .htaccess) into public_html.\n");

function walk(d) { if (!existsSync(d)) return []; return readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; }); }
