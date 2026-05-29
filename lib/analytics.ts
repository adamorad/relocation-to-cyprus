/**
 * Thin wrappers around GA4's `gtag()` and Meta Pixel's `fbq()` to fire custom
 * events from client components. Both are no-ops if the respective tag isn't
 * loaded (dev, ad-blocker, env var not set).
 */

type GtagFn = (
  command: "event",
  name: string,
  params?: Record<string, unknown>,
) => void;

type FbqFn = (
  command: "track",
  event: string,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    fbq?: FbqFn;
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

export function trackMetaEvent(
  event: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  try {
    window.fbq?.("track", event, params);
  } catch {
    /* swallow — analytics must never break the UI */
  }
}
