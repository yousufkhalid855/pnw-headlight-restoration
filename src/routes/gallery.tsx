import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { ContactStrip, Eyebrow, PageIntro, Photo } from "@/components/pnw/pnw-site";
import { ASSETS } from "@/lib/pnw-data";
import { getPageOrigin } from "@/lib/meta.functions";
import { businessPageHead } from "@/lib/pnw-metadata";

const photos = [
  { name: "Red car before and after", src: ASSETS.redComparison, alt: "Red car headlight before and after, supplied side-by-side photograph", label: "Before & after · supplied photographs" },
  { name: "Cloudy headlight before", src: ASSETS.cloudyCloseup, alt: "Cloudy gray SUV headlight and protective masking before restoration", label: "Before · supplied vehicle photo" },
  { name: "Silver car before", src: ASSETS.silverBefore, alt: "Silver vehicle headlight before restoration", label: "Before · supplied vehicle photo" },
  { name: "Silver car after", src: ASSETS.silverAfter, alt: "Silver vehicle headlight after restoration", label: "After · supplied vehicle photo" },
  { name: "Red car before", src: ASSETS.redBefore, alt: "Red vehicle headlight with tape before restoration", label: "Before · supplied vehicle photo" },
  { name: "Red car after", src: ASSETS.redAfter, alt: "Red vehicle headlight after restoration", label: "After · supplied vehicle photo" },
  { name: "Clear headlight after", src: ASSETS.clearDetail, alt: "Clear-looking vehicle headlight in the supplied after photos", label: "After · supplied vehicle photo" },
  { name: "Illustrated example", src: ASSETS.illustrativeComparison, alt: "Illustrated truck headlight before and after graphic; digitally edited illustration, results vary", label: "DIGITALLY EDITED ILLUSTRATION · RESULTS VARY" },
];
const filters = ["All photos", "Before & after", "Headlights", "Illustration"] as const;

export const Route = createFileRoute("/gallery")({
  loader: async () => ({ origin: await getPageOrigin() }),
  head: ({ loaderData }) => businessPageHead(loaderData.origin, "/gallery", "Headlight Restoration Photos | PnW Headlight Restoration", "See the vehicle and before-and-after photographs supplied for PnW Headlight Restoration. The digitally edited illustration is clearly identified."),
  component: GalleryPage,
});

function GalleryPage() {
  const [filter, setFilter] = useState<string>(filters[0]);
  const visible = photos.filter((photo, index) => filter === "All photos" || (filter === "Illustration" && index === photos.length - 1) || (filter === "Before & after" && index !== 1 && index !== 2 && index !== photos.length - 1) || (filter === "Headlights" && index > 0 && index < photos.length - 1));
  return <>
    <PageIntro image={ASSETS.redBefore} eyebrow="Supplied vehicle photographs · individual results vary" title={<>A closer look.<br /><span>A real difference.</span></>} description="These are the original vehicle photographs provided for PnW. Each photo is labeled; the illustrated green truck is a digitally edited sample, not a customer restoration." />
    <section id="gallery-photos" className="gallery-section wrap">
      <div className="gallery-toolbar"><Eyebrow>{visible.length} photographs</Eyebrow><div className="gallery-filters" aria-label="Filter photos">{filters.map((name) => <button type="button" key={name} aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}</button>)}</div></div>
      <div className="gallery-grid">{visible.map((photo, index) => <figure key={photo.name} className={`gallery-photo${index === 0 ? " gallery-photo--large" : ""}`}><span className="gallery-photo__image"><Photo src={photo.src} alt={photo.alt} /></span><figcaption className="gallery-photo__caption"><span><span className="gallery-photo__category">{photo.label}</span><span className="gallery-photo__title">{photo.name}</span></span></figcaption></figure>)}</div>
      <aside className="illustration-notice"><span aria-hidden="true">i</span><p>The green truck graphic is a digitally edited illustration, not a photographed restoration. As displayed in the supplied image: results vary.</p></aside>
    </section>
    <ContactStrip headline="Have a question about your vehicle?" />
  </>;
}