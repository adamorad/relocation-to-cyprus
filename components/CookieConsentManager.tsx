"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";

type Consent = "accepted" | "declined" | null;

const STORAGE_KEY = "realcy_consent";

export function CookieConsentManager({
  gaId,
  pixelId,
}: {
  gaId: string;
  pixelId: string;
}) {
  const [consent, setConsent] = useState<Consent>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Consent;
    setConsent(stored);
    setVisible(!stored);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setConsent("declined");
    setVisible(false);
  };

  return (
    <>
      {consent === "accepted" && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
window.gtag = function(){window.dataLayer.push(arguments);};
window.gtag('js', new Date());
window.gtag('config', '${gaId}', { anonymize_ip: true });`}
          </Script>
        </>
      )}
      {/* Cookieless analytics: loads for every visitor; honours Do Not Track. */}
      <Script
        src="https://stackfollow-analytics.vercel.app/script.js"
        data-website-id="5546e3e2-cc20-4d1b-a535-02f3d0db2a1e"
        data-do-not-track="true"
        strategy="afterInteractive"
      />
      {consent === "accepted" && pixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${pixelId}');fbq('track','PageView');`}
        </Script>
      )}
      {visible && (
        <div data-pagefind-ignore className="fixed bottom-0 left-0 right-0 z-50 bg-ink border-t border-white/15 px-4 py-3 md:py-4">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <p className="flex-1 text-xs text-white/85 leading-relaxed">
              We use cookies for analytics (Google Analytics) and to measure ad performance (Meta Pixel).{" "}
              <Link href="/privacy/" className="underline hover:text-white">
                Privacy Policy
              </Link>
            </p>
            <div className="flex gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={decline}
                className="text-xs px-3 py-1.5 rounded border border-white/40 text-white/85 hover:text-white hover:border-white transition-colors"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={accept}
                className="text-xs px-4 py-1.5 rounded bg-white text-ink font-semibold hover:bg-sky-strong transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
