/**
 * Tiny pub/sub that drives the global <RouteLoader /> overlay.
 *
 * Why it exists:
 *   Next.js client-side navigation in a static-exported App Router app can
 *   produce a visible "flick" — the destination tree mounts at scrollY=0
 *   for ~1 frame before our <ScrollRestoration> (home) or WorkArticle's
 *   useLayoutEffect (/work) snaps the user to the right place. Hiding
 *   <html> via JS works for the first paint but cuts in/out too sharply
 *   and looks broken on slow machines.
 *
 *   This module gives the destination page (or any other code) a clean
 *   way to say "I'm about to navigate, mask everything" and "I'm settled,
 *   reveal me again" — and a React component subscribes to render a
 *   smooth crossfade overlay in between.
 *
 * Why pub/sub instead of context:
 *   The triggers (link onClick handlers, useLayoutEffect on destination
 *   page mount) need a module-level imperative API — they can't all sit
 *   inside a useContext hook without a lot of prop drilling. A 12-line
 *   module-scoped Set keeps the surface area minimal.
 */

type LoaderEvent = "show" | "hide";
type Listener = (event: LoaderEvent) => void;

const listeners = new Set<Listener>();

export function showRouteLoader() {
  if (typeof window === "undefined") return;
  listeners.forEach((l) => l("show"));
}

export function hideRouteLoader() {
  if (typeof window === "undefined") return;
  listeners.forEach((l) => l("hide"));
}

export function subscribeRouteLoader(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
