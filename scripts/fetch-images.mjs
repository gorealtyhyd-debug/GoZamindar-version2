// Downloads & pre-sizes all project imagery into /public/images so the static build is self-contained.
// Runs automatically before `npm run dev` and `npm run build`. Use --force to re-download.
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const force = process.argv.includes("--force");
const projects = JSON.parse(readFileSync("data/projects.json", "utf8"));
const HERO = "d78286_f6eab660615b4e8f8843335cceac381a~mv2.webp";
const CONTACT = "d78286_f84ece4aceac4fa5a22f483f6bc49d45~mv2.jpeg";
const src = (id, w, h, q = 80) =>
  `https://static.wixstatic.com/media/${id}/v1/fill/w_${w},h_${h},al_c,q_${q}/${id.split("~")[0]}.jpg`;

const jobs = [
  ["public/images/hero.jpg", src(HERO, 2400, 1350, 85)],
  ["public/images/og.jpg", src(HERO, 1200, 630, 82)],
  ["public/images/contact.jpg", src(CONTACT, 1400, 900, 82)],
  ...projects.filter((p) => p.wix).flatMap((p) => [
    [`public/images/projects/${p.slug}.jpg`, src(p.wix, 800, 600)],
    [`public/images/projects/${p.slug}-lg.jpg`, src(p.wix, 1600, 1000, 84)],
  ]),
].filter(([file]) => force || !existsSync(file));

if (!jobs.length) { console.log("✓ images already present"); process.exit(0); }

let ok = 0, failed = 0;
const run = async ([file, url]) => {
  try {
    const res = await fetch(url, { headers: { Accept: "image/jpeg,image/*" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
    ok++;
  } catch (e) {
    failed++;
    console.warn(`⚠ could not fetch ${file}: ${e.message}`);
  }
};
for (let i = 0; i < jobs.length; i += 6) await Promise.all(jobs.slice(i, i + 6).map(run));
console.log(`✓ images: ${ok} downloaded${failed ? `, ${failed} failed (re-run: npm run images:refresh)` : ""}`);
