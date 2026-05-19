"use client";

import { useEffect, useState } from "react";

/**
 * Live mnemo release version, fetched client-side from the GitHub API on
 * mount so the portfolio never goes stale as mnemo ships.
 *
 * Static-export friendly: no server needed, the fetch runs in the browser.
 * `FALLBACK` is the version known at build time so the badge is never
 * blank — used if GitHub's API is rate-limited (60 req/hr/IP unauth) or
 * unreachable.
 */
const FALLBACK = "v4.6.2";
const RELEASES_API =
  "https://api.github.com/repos/mmct-jsc/mnemo/releases/latest";

export type MnemoVersion = {
  version: string;
  /** true once a live value has replaced the build-time fallback */
  live: boolean;
};

export function useMnemoVersion(): MnemoVersion {
  const [state, setState] = useState<MnemoVersion>({
    version: FALLBACK,
    live: false,
  });

  useEffect(() => {
    let cancelled = false;
    fetch(RELEASES_API, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { tag_name?: string }) => {
        if (cancelled || !data?.tag_name) return;
        setState({ version: data.tag_name, live: true });
      })
      .catch(() => {
        /* keep fallback — rate limited or offline */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
