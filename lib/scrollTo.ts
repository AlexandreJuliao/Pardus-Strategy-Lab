export const CTA_TARGET_ID = "consultoria";
export const SCROLL_EVENT = "pardus:scrollto";

const NAV_OFFSET = -84; // clears the fixed navbar

export type ScrollRequest = {
  el: HTMLElement;
  offset: number;
  handled: boolean;
};

/**
 * Smoothly scrolls to a section.
 *
 * Lenis owns the scroll position while it runs (native scrollTo is ignored),
 * so we ask the live instance to do the work via an event that SmoothScroll
 * listens for. Holding the instance on `window` is not reliable — Fast Refresh
 * and StrictMode leave stale, destroyed instances behind, and a destroyed
 * Lenis silently swallows scrollTo. If nothing answers the event (reduced
 * motion, Lenis not mounted), we scroll natively instead.
 */
export function scrollToId(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;

  const detail: ScrollRequest = { el, offset: NAV_OFFSET, handled: false };
  window.dispatchEvent(new CustomEvent(SCROLL_EVENT, { detail }));
  if (detail.handled) return;

  const top = el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}
