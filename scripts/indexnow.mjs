// Instantly notifies Bing, Yandex, Seznam & Naver (IndexNow) about every URL in dist/sitemap.xml.
// Run AFTER uploading dist/ to Hostinger:  npm run indexnow
// Google does not support IndexNow/sitemap pings — it recrawls via robots.txt + the sitemap you submit in Search Console.
import { readFileSync, existsSync } from "node:fs";

const KEY = "gozamindar5f3c9a2e7b1d4e8f";
const HOST = (process.env.NEXT_PUBLIC_SITE_URL || "https://gozamindar.in").replace(/\/$/, "");
if (!existsSync("dist/sitemap.xml")) { console.error("✗ dist/sitemap.xml not found — run npm run build first"); process.exit(1); }
const urls = [...readFileSync("dist/sitemap.xml", "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(HOST).host, key: KEY, keyLocation: `${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(res.ok || res.status === 202 ? `✓ IndexNow: submitted ${urls.length} URLs` : `⚠ IndexNow HTTP ${res.status}: ${await res.text()}`);
