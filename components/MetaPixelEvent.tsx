"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function MetaPixelEvent({
  event,
  params,
}: {
  event: string;
  params?: Record<string, unknown>;
}) {
  useEffect(() => {
    trackEvent(event, params);
    // fire once on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
