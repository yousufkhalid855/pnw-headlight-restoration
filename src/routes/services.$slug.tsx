import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { ActionLink, ContactStrip, Eyebrow, NoteBanner, Photo } from "@/components/pnw/pnw-site";
import { ASSETS, SERVICE_PAGES } from "@/lib/pnw-data";
import { getPageOrigin } from "@/lib/meta.functions";

export const Route = createFileRoute("/services/$slug")({
  loader: async ({ params }) => ({ origin: await getPageOrigin(), slug: params.slug }),
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "PnW Headlight Restoration | Bellingham" }] };
    const slugPath = `/services/${loaderData.slug}`;
    const page = SERVICE_PAGES[slugPath];
    const title = page ? `${page.title} | PnW Headlight Restoration` : "Automotive Lighting Services | PnW Headlight Restoration";
    const description = page?.description ?? "Explore specialized vehicle lighting restoration services from PnW Headlight Restoration in Bellingham, Washington.";
    const image = `${loaderData.origin}/images/pnw-logo-preview.jpg`;
    const url = `${loaderData.origin}${slugPath}`;
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { property: "og:url", content: url }, { property: "og:image", content: image }, { name: "twitter:card", content: "summary_large_image" }, { name: "twitter:title", content: title }, { name: "twitter:description", content: description }, { name: "twitter:image", content: image }], links: [{ rel: "canonical", href: url }] };
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const data = Route.useLoaderData();
  if (!data) return <section className="not-found wrap"><Eyebrow>PnW Headlight Restoration</Eyebrow><h1>Service details<br /><span>not available.</span></h1><ActionLink href="/services">Explore services</ActionLink></section>;
  const { slug } = data;
  const page = SERVICE_PAGES[`/services/${slug}`];
  if (!page) {
    return <section className="not-found wrap"><Eyebrow>Unknown service</Eyebrow><h1>Service details<br /><span>not found.</span></h1><ActionLink href="/services">Explore services</ActionLink></section>;
  }

  return (
    <>
      <section className="service-detail-hero photo-hero">
        <div className="wrap service-detail-hero__layout">
          <div className="service-detail-hero__content"><Eyebrow>{page.eyebrow}</Eyebrow><h1>{page.title.split(" & ").map((word, i) => <span key={`${word}-${i}`}>{word}{i === 0 && page.title.includes(" & ") ? <> &<br /></> : <>{i === 0 ? <br /> : null}</>}</span>)}</h1><p>{page.description}</p><ActionLink href="/request-a-quote">Ask about this service</ActionLink></div>
          <figure className="service-detail-hero__figure"><Photo src={page.image} alt={page.imageAlt} eager /><figcaption>Supplied business photograph · Vehicle-specific results vary</figcaption></figure>
        </div>
      </section>
      <section className="service-detail-overview wrap">
        <div><Eyebrow>About this service</Eyebrow><h2>Lighting care,<br /><span>focused on you.</span></h2></div>
        <div><p className="service-detail-overview__description">{page.detail}</p><NoteBanner>Contact PnW to confirm whether a service is right for your vehicle.</NoteBanner></div>
      </section>
      {page.image === ASSETS.cloudyCloseup || page.image === ASSETS.redBefore ? (
        <section className="service-detail-proof"><div className="wrap service-detail-proof__layout"><figure><Photo src={ASSETS.redComparison} alt="Before-and-after comparison of the same red car headlight supplied by the business" /><figcaption>Supplied photographs · Individual results vary</figcaption></figure><div><Eyebrow>Supplied before & after</Eyebrow><h2>Real photos.<br /><span>A visible difference.</span></h2><p>Explore the before-and-after photographs supplied with this website brief. Every vehicle and lens is different.</p><ActionLink href="/gallery" variant="outline">See the photo gallery</ActionLink></div></div></section>
      ) : null}
      <section className="service-detail-includes wrap"><div><Eyebrow>Related services</Eyebrow><h2>Keep exploring.</h2></div><div>{page.services.map((service) => <p key={service}><Check aria-hidden="true" />{service}<ArrowRight aria-hidden="true" /></p>)}</div></section>
      <div className="wrap service-detail-more"><a href="/services">See every lighting service<ArrowUpRight aria-hidden="true" /></a><a href="/gallery">See the supplied photographs<ArrowUpRight aria-hidden="true" /></a></div>
      <ContactStrip headline={`Ask PnW about ${page.title.toLowerCase()}.`} />
    </>
  );
}