/**
 * Thin wrapper around GA4's `gtag()` to fire custom events from client
 * components. No-op if gtag isn't loaded (dev, ad-blocker, no GA_ID set).
 */

type GtagFn = (
  command: "event",
  name: string,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

export function trackEvent(
  name: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", name, params);
  } catch {
    /* swallow — analytics must never break the UI */
  }
}
