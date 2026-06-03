"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { trackEvent } from "@/lib/analytics";
import type { EnrichedListing, ImageGallery } from "@/lib/listingsData";
import { EmailCapture } from "./EmailCapture";

type Props = {
  listing: EnrichedListing | null;
  onClose: () => void;
};

export default function ListingPanel({ listing, onClose }: Props) {
  const visible = listing !== null;
  useEffect(() => {
    if (!visible) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible, onClose]);
  return (
    <aside
      className={`pointer-events-auto fixed top-0 right-0 h-full w-full md:w-[560px] bg-white text-slate-900 shadow-2xl overflow-y-auto transition-transform duration-300 ease-out z-40 ${
        visible ? "translate-x-0" : "translate-x-full"
      }`}
      role="dialog"
      aria-modal={visible}
      aria-label={listing ? `${listing.title} details` : undefined}
      aria-hidden={!visible}
    >
      {listing ? (
        <ListingPanelBody key={listing.slug} listing={listing} onClose={onClose} />
      ) : null}
    </aside>
  );
}

function ListingPanelBody({
  listing,
  onClose,
}: {
  listing: EnrichedListing;
  onClose: () => void;
}) {
  // One lightbox state for the panel — different sources push a list of
  // image URLs and an active index into it.
  const [lightboxState, setLightboxState] = useState<
    { images: string[]; index: number } | null
  >(null);
  const openLightbox = (images: string[], index: number) => {
    setLightboxState({ images, index });
    trackEvent("gallery_open", { slug: listing.slug, image_index: index });
  };

  return (
    <div>
      {lightboxState ? (
        <Lightbox
          images={lightboxState.images}
          activeIndex={lightboxState.index}
          onChange={(i) =>
            setLightboxState((s) => (s ? { ...s, index: i } : s))
          }
          onClose={() => setLightboxState(null)}
        />
      ) : null}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 pt-5 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-700 font-semibold">
              {listing.regionCity} region
            </p>
            <h2 className="mt-1 text-xl font-bold leading-snug">
              {listing.title}
            </h2>
            {listing.location ? (
              <p className="text-sm text-slate-600 mt-1 truncate">
                {listing.location}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 text-slate-500 hover:text-slate-900 text-2xl leading-none w-11 h-11 -mt-2 rounded-full hover:bg-slate-100 flex items-center justify-center"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {listing.images && listing.images.length > 0 ? (
          <ImageGallery
            images={listing.images}
            title={listing.title}
            onOpen={(i) => openLightbox(listing.images!, i)}
          />
        ) : null}

        <div className="rounded-lg bg-stone-50 border border-slate-200 p-3">
          <div className="text-[10px] uppercase tracking-wider text-slate-900 font-semibold">
            Price range
          </div>
          <div className="text-lg font-bold text-slate-900">
            {listing.priceRange ?? "—"}
          </div>
          {listing.pricePerM2 ? (
            <div className="text-xs text-slate-600 mt-1">
              {listing.pricePerM2}
            </div>
          ) : null}
        </div>

        <ActionButtons listing={listing} />

        <div className="rounded-xl border border-[#35cdc4]/40 bg-teal-50/50 p-4">
          <EmailCapture
            region={listing.regionCity ?? undefined}
            source="listing_panel"
          />
        </div>

        {listing.videoUrl ? <VideoEmbed url={listing.videoUrl} /> : null}

        <MapEmbed lat={listing.lat} lng={listing.lng} location={listing.location} />

        <DeveloperBlock listing={listing} />

        {listing.offers.length > 0 ? (
          <Section title={`Units (${listing.offers.length})`}>
            <div className="space-y-2">
              {listing.offers.map((o, idx) => (
                <UnitCard
                  key={`${o.unit ?? o.title ?? "u"}-${idx}`}
                  offer={o}
                  onOpenImages={openLightbox}
                />
              ))}
            </div>
          </Section>
        ) : null}

        {listing.imageGalleries && listing.imageGalleries.length > 0 ? (
          <FloorPlansSection
            galleries={listing.imageGalleries}
            onOpenImages={openLightbox}
          />
        ) : null}

        {Object.keys(listing.specs).length > 0 ? (
          <Section title="Specs">
            <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
              {Object.entries(listing.specs).map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-slate-600">{k}</dt>
                  <dd className="text-slate-900 font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </Section>
        ) : null}

        {listing.features.length > 0 ? (
          <Section title="Features">
            <ul className="text-xs text-slate-700 grid grid-cols-1 gap-1">
              {listing.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-slate-900">●</span>
                  {f}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {Object.keys(listing.nearby).length > 0 ? (
          <Section title="Nearby">
            <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
              {Object.entries(listing.nearby).map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-slate-600">{k}</dt>
                  <dd className="text-slate-900 font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </Section>
        ) : null}

        {listing.description ? (
          <DescriptionSection description={listing.description} />
        ) : null}
      </div>
    </div>
  );
}

function ActionButtons({ listing }: { listing: EnrichedListing }) {
  // Open a Google search for the developer; we don't ship hardcoded URLs so
  // the user lands on the developer's site via search results.
  const devSearchUrl = listing.developer?.name
    ? `https://www.google.com/search?q=${encodeURIComponent(
        `${listing.developer.name} Cyprus real estate`,
      )}`
    : null;
  const brochure = normaliseBrochure(listing);
  const phones = listing.contacts?.phone ?? [];
  const email = listing.contacts?.email?.trim() || null;
  return (
    <div className="flex flex-wrap gap-2">
      {devSearchUrl ? (
        <a
          href={devSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent("developer_click", {
              slug: listing.slug,
              developer: listing.developer?.name,
            })
          }
          className="flex-1 min-w-[160px] text-center text-sm font-semibold bg-slate-900 hover:bg-slate-700 text-white py-2 rounded-md transition-colors"
        >
          Find developer ↗
        </a>
      ) : null}
      {email ? (
        <a
          href={`mailto:${email}`}
          onClick={() => trackEvent("email_click", { slug: listing.slug })}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          Email
        </a>
      ) : null}
      {brochure ? (
        <a
          href={brochure}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent("brochure_click", { slug: listing.slug })
          }
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Brochure
        </a>
      ) : null}
      {phones.length > 0 ? (
        <a
          href={`tel:${phones[0]}`}
          onClick={() => trackEvent("phone_click", { slug: listing.slug })}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012.18 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.1a16 16 0 006 6l.62-.62a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 15.93z"/>
          </svg>
          {phones[0]}
        </a>
      ) : null}
    </div>
  );
}

function normaliseBrochure(listing: EnrichedListing): string | null {
  const b = listing.brochures;
  if (!b || b.length === 0) return null;
  const first = b[0];
  if (typeof first === "string") return first;
  return first?.url ?? null;
}

function MapEmbed({
  lat,
  lng,
  location,
}: {
  lat: number;
  lng: number;
  location: string | null;
}) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  const d = 0.005;
  const bbox = `${lng - d},${lat - d},${lng + d},${lat + d}`;
  const embed = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  const gmaps = `https://www.google.com/maps?q=${lat},${lng}`;
  return (
    <Section title="Location">
      {/* h-44 visible, iframe is taller and shifted up so the OSM footer
        (Report a problem | © OpenStreetMap ...) sits below the clip line. */}
      <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-100 h-44 relative">
        <iframe
          title={`Map of ${location ?? "listing"}`}
          src={embed}
          className="absolute inset-x-0 border-0 w-full"
          style={{ top: 0, height: "calc(100% + 34px)" }}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups"
          referrerPolicy="no-referrer"
        />
      </div>
      <a
        href={gmaps}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-slate-900 hover:text-slate-700 font-semibold inline-block mt-2"
      >
        Open in Google Maps ↗
      </a>
    </Section>
  );
}

function VideoEmbed({ url }: { url: string }) {
  // Only YouTube embed URLs are accepted into the iframe; anything else falls
  // back to a plain link to avoid embedding arbitrary content from data.
  const ytEmbed = /^https:\/\/(www\.)?youtube(-nocookie)?\.com\/embed\/[A-Za-z0-9_-]{6,}(\?.*)?$/;
  const isEmbeddable = ytEmbed.test(url);
  return (
    <Section title="Video tour">
      {isEmbeddable ? (
        <div className="rounded-lg overflow-hidden border border-slate-200 aspect-video bg-black">
          <iframe
            src={url}
            title="Project video"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-slate-900 hover:text-slate-700"
        >
          Watch video ↗
        </a>
      )}
    </Section>
  );
}

function DeveloperBlock({ listing }: { listing: EnrichedListing }) {
  const dev = listing.developer;
  if (!dev?.name) return null;
  const url = `https://www.google.com/search?q=${encodeURIComponent(
    `${dev.name} Cyprus real estate`,
  )}`;
  const inner = (
    <div className="flex items-center gap-3">
      {dev.logo ? (
        <img
          src={dev.logo}
          alt=""
          className="h-10 w-10 rounded object-contain bg-white border border-slate-200 p-1"
        />
      ) : null}
      <div className="min-w-0">
        <div className="text-sm font-semibold truncate">{dev.name}</div>
        {dev.address ? (
          <div className="text-xs text-slate-600 truncate">{dev.address}</div>
        ) : null}
      </div>
    </div>
  );
  return (
    <Section title="Developer">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-md border border-slate-200 p-2 hover:border-slate-900 hover:bg-stone-50 transition-colors"
      >
        {inner}
      </a>
    </Section>
  );
}

function UnitCard({
  offer,
  onOpenImages,
}: {
  offer: EnrichedListing["offers"][number];
  onOpenImages: (images: string[], index: number) => void;
}) {
  const f = (offer as { features?: Record<string, string> }).features ?? {};
  const get = (k: string) =>
    (offer as Record<string, unknown>)[k] ??
    (f as Record<string, string>)[k] ??
    null;
  const images = Array.isArray((offer as { images?: unknown }).images)
    ? ((offer as { images: unknown[] }).images.filter(
        (x) => typeof x === "string",
      ) as string[])
    : [];
  const pricePerM2 = (offer as { pricePerM2?: string | null }).pricePerM2;

  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-xs">
      <div className="flex gap-3">
        {images.length > 0 ? (
          <button
            type="button"
            onClick={() => onOpenImages(images, 0)}
            className="relative flex-shrink-0 w-20 h-16 rounded overflow-hidden bg-slate-200 cursor-zoom-in group"
            aria-label="Open unit images"
          >
            <img
              src={images[0]}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              loading="lazy"
            />
            {images.length > 1 ? (
              <span className="absolute bottom-0.5 right-0.5 bg-slate-900/80 text-white text-[10px] font-semibold px-1 rounded">
                +{images.length - 1}
              </span>
            ) : null}
          </button>
        ) : null}

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <div className="font-semibold text-sm">
              {offer.unit ?? offer.title ?? "—"}
            </div>
            <div className="text-slate-900 font-semibold">
              {offer.price ?? "—"}
            </div>
          </div>
          {pricePerM2 ? (
            <div className="text-[11px] text-slate-600 mt-0.5">
              {pricePerM2}
            </div>
          ) : null}

          <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-slate-700">
            {get("bedrooms") ? <Spec k="Beds" v={String(get("bedrooms"))} /> : null}
            {get("bathrooms") ? <Spec k="Baths" v={String(get("bathrooms"))} /> : null}
            {get("living area") || f.living_area ? (
              <Spec k="Living" v={String(get("living area") ?? f.living_area)} />
            ) : null}
            {get("plot/land") || f.land_area ? (
              <Spec k="Plot" v={String(get("plot/land") ?? f.land_area)} />
            ) : null}
            {get("floor") ? <Spec k="Floor" v={String(get("floor"))} /> : null}
            {get("parking") ? <Spec k="Parking" v={String(get("parking"))} /> : null}
          </div>
        </div>
      </div>

      {offer.note || offer.description ? (
        <div className="mt-2 text-[11px] text-slate-600 italic">
          {offer.note ?? offer.description}
        </div>
      ) : null}
    </div>
  );
}

function FloorPlansSection({
  galleries,
  onOpenImages,
}: {
  galleries: ImageGallery[];
  onOpenImages: (images: string[], index: number) => void;
}) {
  // Bundle all gallery images into one combined list for the lightbox so
  // arrow keys traverse them as a single set.
  const combined = galleries.flatMap((g) => g.images);
  if (combined.length === 0) return null;
  const title =
    galleries.length === 1 && galleries[0].title
      ? galleries[0].title
      : "Floor plans & renders";
  return (
    <Section title={title}>
      <div className="grid grid-cols-3 gap-2">
        {combined.slice(0, 12).map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => onOpenImages(combined, i)}
            className="aspect-[4/3] rounded-md overflow-hidden bg-slate-100 border border-slate-200 cursor-zoom-in group"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </button>
        ))}
      </div>
      {combined.length > 12 ? (
        <div className="text-[11px] text-slate-600 mt-1">
          showing 12 of {combined.length} · open one to view all
        </div>
      ) : null}
    </Section>
  );
}

function ImageGallery({
  images,
  title,
  onOpen,
}: {
  images: string[];
  title: string;
  onOpen: (index: number) => void;
}) {
  const [active, setActive] = useState(0);
  const safe = images.slice(0, 12);
  if (safe.length === 0) return null;
  return (
    <div>
      <button
        type="button"
        onClick={() => onOpen(active)}
        className="block w-full aspect-[16/10] rounded-lg overflow-hidden bg-slate-100 border border-slate-200 group cursor-zoom-in"
        aria-label={`View ${title} gallery`}
      >
        <img
          src={safe[active]}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
      </button>
      {safe.length > 1 ? (
        <div className="flex gap-1 mt-2 overflow-x-auto pb-1">
          {safe.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => onOpen(i)}
              className={`flex-shrink-0 w-14 h-10 rounded overflow-hidden border-2 ${
                i === active ? "border-slate-900" : "border-transparent"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Lightbox({
  images,
  activeIndex,
  onClose,
  onChange,
}: {
  images: string[];
  activeIndex: number;
  onClose: () => void;
  onChange: (idx: number) => void;
}) {
  const prev = useCallback(
    () => onChange((activeIndex - 1 + images.length) % images.length),
    [activeIndex, images.length, onChange],
  );
  const next = useCallback(
    () => onChange((activeIndex + 1) % images.length),
    [activeIndex, images.length, onChange],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    // Prevent page scroll while lightbox is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next]);

  return createPortal(
    <div
      className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 text-white/80 hover:text-white text-4xl leading-none w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10"
        aria-label="Close"
      >
        ×
      </button>
      {images.length > 1 ? (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 md:left-8 text-white/80 hover:text-white text-5xl w-14 h-14 flex items-center justify-center rounded-full hover:bg-white/10"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 md:right-8 text-white/80 hover:text-white text-5xl w-14 h-14 flex items-center justify-center rounded-full hover:bg-white/10"
            aria-label="Next"
          >
            ›
          </button>
        </>
      ) : null}

      <img
        src={images[activeIndex]}
        alt=""
        className="max-w-[92vw] max-h-[88vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium"
        onClick={(e) => e.stopPropagation()}
      >
        {activeIndex + 1} / {images.length}
      </div>
    </div>,
    document.body,
  );
}

function DescriptionSection({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);
  const LIMIT = 600;
  const isTruncated = description.length > LIMIT;
  return (
    <Section title="About">
      <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
        {isTruncated && !expanded
          ? `${description.slice(0, LIMIT)}…`
          : description}
      </p>
      {isTruncated ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1.5 text-xs font-semibold text-slate-900 hover:text-slate-600"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      ) : null}
    </Section>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-semibold mb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div className="contents">
      <div className="text-slate-600">{k}</div>
      <div className="text-slate-900 font-medium">{v}</div>
    </div>
  );
}
