import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin, Phone } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  ActionLink,
  ContactStrip,
  Eyebrow,
  Photo,
  SectionHeading,
  ServicePageLink,
} from "@/components/pnw/pnw-site";
import { ASSETS, BUSINESS, SERVICES } from "@/lib/pnw-data";
import { getPageOrigin } from "@/lib/meta.functions";

export const Route = createFileRoute("/")({
  loader: () => getPageOrigin(),
  head: ({ loaderData }) => ({
    meta: [
      { title: "PnW Headlight Restoration | Bellingham, Washington" },
      { name: "description", content: "Explore headlight, taillight, and fog light restoration with PnW Headlight Restoration in Bellingham, Washington. Call (360) 521-2793." },
      { property: "og:title", content: "PnW Headlight Restoration | Bellingham, Washington" },
      { property: "og:description", content: "Headlight, taillight, and fog light restoration in Bellingham, Washington." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${loaderData}/` },
      { property: "og:image", content: `${loaderData}/images/pnw-logo-preview.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "PnW Headlight Restoration | Bellingham, Washington" },
      { name: "twitter:description", content: "Headlight, taillight, and fog light restoration in Bellingham, Washington." },
      { name: "twitter:image", content: `${loaderData}/images/pnw-logo-preview.jpg` },
    ],
    links: [{ rel: "canonical", href: `${loaderData}/` }],
  }),
  component: HomePage,
});

function CompareSlider() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  function update(clientX: number) {
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds?.width) return;
    setPosition(Math.max(5, Math.min(95, ((clientX - bounds.left) / bounds.width) * 100)));
  }

  return (
    <div
      ref={containerRef}
      className="comparison-slider"
      style={{ "--compare-position": `${position}%` } as React.CSSProperties}
      onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) update(event.clientX); }}
      onPointerDown={(event) => { event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId); update(event.clientX); }}
      onPointerUp={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
      role="group"
      aria-label="Compare the supplied red car headlight before and after photographs"
    >
      <Photo src={ASSETS.redAfter} alt="Same red car headlight, after restoration" className="comparison-slider__image comparison-slider__after" />
      <div className="comparison-slider__before">
        <Photo src={ASSETS.redBefore} alt="Red car headlight, before restoration" className="comparison-slider__image" />
      </div>
      <span className="comparison-slider__label comparison-slider__label--before">Before</span>
      <span className="comparison-slider__label comparison-slider__label--after">After</span>
      <span className="comparison-slider__handle" aria-hidden="true"><span /></span>
      <label className="visually-hidden" htmlFor="comparison-range">Adjust before and after photo comparison</label>
      <input
        id="comparison-range"
        className="comparison-slider__range"
        type="range"
        min="5"
        max="95"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-valuetext={`${position}% before photo shown`}
      />
    </div>
  );
}

function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero__image">
          <Photo src={ASSETS.hero} alt="Clear-looking restored headlight on a vehicle photographed in Bellingham" eager />
        </div>
        <div className="home-hero__shade" />
        <div className="wrap home-hero__content">
          <Eyebrow>PnW Headlight Restoration · Bellingham, WA</Eyebrow>
          <h1>A brighter look<br />starts <span>right here.</span></h1>
          <p>Dedicated headlight, taillight, and fog light restoration for your vehicle in Bellingham, Washington.</p>
          <div className="home-hero__actions">
            <Button asChild size="lg" className="action-link"><Link to="/request-a-quote">Request a quote<ArrowUpRight aria-hidden="true" /></Link></Button>
            <Button asChild variant="outline" size="lg" className="action-link"><Link to="/services">Explore services<ArrowRight aria-hidden="true" /></Link></Button>
          </div>
          <a className="home-hero__phone" href={BUSINESS.phoneHref}><Phone aria-hidden="true" /> {BUSINESS.phone}</a>
        </div>
        <a className="home-hero__scroll" href="#comparison"><ArrowDown aria-hidden="true" /> Discover the difference</a>
        <span className="home-hero__index" aria-hidden="true">48°45′ N &nbsp; 122°29′ W</span>
      </section>

      <section className="comparison-section" id="comparison">
        <div className="wrap comparison-section__layout">
          <div className="comparison-section__intro">
            <Eyebrow>Restoration, in focus</Eyebrow>
            <h2>A change you<br />can <span>actually see.</span></h2>
            <p>See the supplied photographs of the same red car before and after headlight restoration. Move the comparison to explore the difference.</p>
            <Link className="inline-action" to="/gallery">See every photograph <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="comparison-section__figure">
            <CompareSlider />
            <p className="photo-note">Supplied before-and-after photographs. Individual results vary.</p>
          </div>
        </div>
      </section>

      <section className="services-preview">
        <div className="wrap">
          <div className="services-preview__heading">
            <SectionHeading eyebrow="Specialized vehicle lighting care" title={<>Focused on the<br />details that <span>shine.</span></>} description="Explore lighting restoration, lens refinishing, and finishing services from PnW in Bellingham." />
            <ActionLink href="/services" variant="outline">All ten services</ActionLink>
          </div>
          <div className="services-preview__grid">
            <ServicePageLink href="/services/headlight-restoration" className="feature-service feature-service--large">
              <Photo src={ASSETS.clearDetail} alt="Clear-looking restored vehicle headlight from a supplied photo" />
              <span className="feature-service__index">01 / LIGHTING RESTORATION</span>
              <span className="feature-service__title">Headlight restoration</span>
              <span className="feature-service__arrow"><ArrowUpRight aria-hidden="true" /></span>
            </ServicePageLink>
            <ServicePageLink href="/services/yellow-oxidized-headlights" className="feature-service feature-service--cloudy">
              <Photo src={ASSETS.cloudyCloseup} alt="Cloudy headlight with protective masking, before restoration" />
              <span className="feature-service__index">02 / LENS REFINISHING</span>
              <span className="feature-service__title">Yellow & oxidized lenses</span>
              <span className="feature-service__arrow"><ArrowUpRight aria-hidden="true" /></span>
            </ServicePageLink>
            <ServicePageLink href="/services/wet-sanding-polishing" className="feature-service feature-service--polish">
              <Photo src={ASSETS.redBefore} alt="Close-up of the supplied red vehicle before restoration" />
              <span className="feature-service__index">03 / DETAIL & REFINISH</span>
              <span className="feature-service__title">Polishing & cleaning</span>
              <span className="feature-service__arrow"><ArrowUpRight aria-hidden="true" /></span>
            </ServicePageLink>
          </div>
          <div className="service-mini-list">
            {SERVICES.slice(1, 7).map((service) => (
              <ServicePageLink href={service.href} key={service.name}>{service.name}<ArrowUpRight aria-hidden="true" /></ServicePageLink>
            ))}
          </div>
        </div>
      </section>

      <section className="home-location">
        <div className="wrap home-location__layout">
          <div className="home-location__image"><Photo src={ASSETS.redComparison} alt="Supplied red-car headlight before-and-after comparison" /></div>
          <div className="home-location__copy">
            <Eyebrow>Rooted in Bellingham</Eyebrow>
            <h2>Local care.<br /><span>Lighting focus.</span></h2>
            <p>PnW Headlight Restoration focuses on vehicle lighting restoration in Bellingham, Washington. Get in touch to talk about your vehicle and the services available.</p>
            <a className="location-address" href={BUSINESS.mapsHref} target="_blank" rel="noreferrer"><MapPin aria-hidden="true" />3507 Skylark Loop<br />Bellingham, WA 98226<ArrowUpRight aria-hidden="true" /></a>
            <ActionLink href="/service-area" variant="outline">About the service area</ActionLink>
          </div>
        </div>
      </section>

      <section className="home-process">
        <div className="wrap home-process__inner">
          <SectionHeading eyebrow="Getting started" title={<>A simple place<br />to <span>start.</span></>} description="Every vehicle is different. Start a conversation about the lenses, your vehicle, and the service you're considering." />
          <ol className="process-list">
            {["Describe your vehicle and what you've noticed.", "Discuss the lighting service you have in mind.", "Confirm service availability and next steps directly with PnW."].map((step, index) => (
              <li key={step}><span className="process-list__index">0{index + 1}</span><span>{step}</span><ArrowUpRight aria-hidden="true" /></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="illustration-notice wrap"><span aria-hidden="true">i</span><p>The illustrated comparison is a digitally edited sample. Results vary. Actual supplied vehicle photographs are identified separately in the gallery.</p><Link to="/gallery">View photo descriptions <ArrowRight aria-hidden="true" /></Link></section>

      <ContactStrip headline="Curious about your car? Start with a call." />
    </>
  );
}