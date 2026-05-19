// Build-time mnemo version snapshot.
//
// Fetches the latest mnemo release tag and writes public/mnemo-version.json.
// Runs in `prebuild`, so every build (incl. the daily cron rebuild) refreshes
// it. The browser reads this same-origin JSON first — no GitHub rate limit,
// CDN-cached, and as fresh as the last deploy. The client then still hits the
// GitHub API to upgrade to a truly-live value when possible.
//
// Failure policy: never clobber a good existing snapshot with garbage. If the
// fetch fails and a file already exists, keep it. If none exists, write a
// last-known constant so the file is always present.

import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");
const OUT = join(PUBLIC_DIR, "mnemo-version.json");
const API = "https://api.github.com/repos/mmct-jsc/mnemo/releases/latest";
const LAST_KNOWN = "v4.6.2";

function write(version, source) {
  mkdirSync(PUBLIC_DIR, { recursive: true });
  const payload = {
    version,
    source,
    fetchedAt: new Date().toISOString(),
  };
  writeFileSync(OUT, JSON.stringify(payload) + "\n");
  console.log(`mnemo-version.json -> ${version} (${source})`);
}

try {
  const res = await fetch(API, {
    headers: { Accept: "application/vnd.github+json" },
    // Build runners get a clean rate-limit bucket; this is best-effort.
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const data = await res.json();
  if (!data?.tag_name) throw new Error("no tag_name in response");
  write(data.tag_name, "github-release");
} catch (err) {
  console.warn(`[gen-mnemo-version] fetch failed: ${err?.message ?? err}`);
  if (existsSync(OUT)) {
    // Keep whatever good value we already had.
    try {
      const prev = JSON.parse(readFileSync(OUT, "utf8"));
      console.log(`kept existing snapshot -> ${prev.version}`);
    } catch {
      write(LAST_KNOWN, "fallback-constant");
    }
  } else {
    write(LAST_KNOWN, "fallback-constant");
  }
}
