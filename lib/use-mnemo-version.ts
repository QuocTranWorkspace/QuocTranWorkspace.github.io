"use client";

import { useEffect, useState } from "react";

/**
 * mnemo release version, kept current with zero manual work via three layers:
 *
 *  1. Build-time snapshot — `prebuild` writes /mnemo-version.json. A daily
 *     cron rebuild (see .github/workflows/deploy.yml) refreshes it even with
 *     no code pushes, so the baseline tracks new releases on its own.
 *  2. Same-origin read — the browser fetches /mnemo-version.json first:
 *     CDN-cached, instant, no GitHub rate limit. This is the load-bearing
 *     source and is at most ~1 day stale.
 *  3. Live upgrade — it then hits the GitHub API to bump to the exact
 *     latest tag for this visit. Rate-limited (60/hr/IP unauth) so it's
 *     best-effort polish on top, not relied upon.
 *
 * `LAST_KNOWN` is only used if every layer fails (offline + missing JSON).
 */
const LAST_KNOWN = "v4.6.2";
const SNAPSHOT_URL = "/mnemo-version.json";
const RELEASES_API =
  "https://api.github.com/repos/mmct-jsc/mnemo/releases/latest";

export type MnemoVersion = {
  version: string;
  /** true once a value beyond the hardcoded last-known has loaded */
  live: boolean;
};

export function useMnemoVersion(): MnemoVersion {
  const [state, setState] = useState<MnemoVersion>({
    version: LAST_KNOWN,
    live: false,
  });

  useEffect(() => {
    let cancelled = false;

    // Layer 2 — same-origin snapshot (fast, no rate limit).
    fetch(SNAPSHOT_URL, { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { version?: string }) => {
        if (cancelled || !data?.version) return;
        setState({ version: data.version, live: true });
      })
      .catch(() => {
        /* snapshot missing — fall through to the API attempt */
      })
      .finally(() => {
        // Layer 3 — live GitHub tag (best-effort, upgrades the snapshot).
        fetch(RELEASES_API, {
          headers: { Accept: "application/vnd.github+json" },
        })
          .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
          .then((data: { tag_name?: string }) => {
            if (cancelled || !data?.tag_name) return;
            setState({ version: data.tag_name, live: true });
          })
          .catch(() => {
            /* rate limited / offline — snapshot value stands */
          });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
