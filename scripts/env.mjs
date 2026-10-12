// Minimal .env loader for node scripts (Next loads these itself for the app).
import { existsSync, readFileSync } from "node:fs";
for (const f of [".env", ".env.local"]) {
  if (!existsSync(f)) continue;
  for (const line of readFileSync(f, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !line.trim().startsWith("#")) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
