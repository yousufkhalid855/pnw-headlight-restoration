import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";

import { ActionLink, ContactStrip, Eyebrow, Photo, SectionHeading } from "@/components/pnw/pnw-site";
import { ASSETS, BUSINESS } from "@/lib/pnw-data";
import { businessPageHead } from "@/lib/pnw-metadata";
import { getPageOrigin } from "@/lib/meta.functions";

export const Route = createFileRoute("/about")({
  loader: async () => ({ origin: await getPageOrigin() }),
  head: ({ loaderData }) => businessPageHead(loaderData.origin, "/about", "About PnW Headlight Restoration | Bellingham, Washington", "Meet PnW Headlight Restoration, a Bellingham business specializing in automotive lighting restoration."),
  component: AboutPage,
});

function AboutPage() {
  return <>
    <section className="about-hero"><div className="wrap about-hero__layout"><div><Eyebrow>A local, specialized focus</Eyebrow><h1>Focused on<br />what <span>shines.</span></h1><p>PnW Headlight Restoration is a Bellingham, Washington business focused on restoring the appearance of automotive headlights, taillights, and fog lights.</p><ActionLink href="/contact">Get in touch</ActionLink><a href={BUSINESS.phoneHref} className="about-hero__tel">{BUSINESS.phone} <ArrowUpRight aria-hidden="true" /></a></div><div className="about-hero__photo"><Photo src={ASSETS.clearDetail} alt="Vehicle headlight in the supplied after-restoration photographs" eager /><span>PNW · BELLINGHAM, WASHINGTON</span></div></div></section>
    <section className="about-details"><div className="wrap about-details__layout"><div><SectionHeading eyebrow="A focused local service" title={<>Every detail,<br /><span>in its own light.</span></>} /></div><div className="about-details__text"><p>The focus here is automotive lighting—not a menu of unrelated repairs. If your headlights look cloudy or yellowed, or you have questions about taillights, fog lights, polishing, or UV coating, start a conversation with PnW.</p><p>No two vehicles are identical. Describe your make and model, what you are seeing, and the service you are considering; PnW can confirm service availability with you directly.</p><Link className="location-address" to="/service-area"><MapPin aria-hidden="true" />Based in Bellingham, Washington<ArrowUpRight aria-hidden="true" /></Link></div></div></section>
    <section className="about-gallery"><div className="wrap about-gallery__layout"><Photo src={ASSETS.redComparison} alt="Supplied before-and-after red car headlight comparison" /><div><Eyebrow>See it for yourself</Eyebrow><h2>Restoration<br />in <span>real detail.</span></h2><p>Explore the photographs supplied for the website. The illustration is separately labeled; individual results vary.</p><ActionLink href="/gallery" variant="outline">Explore the photographs</ActionLink></div></div></section>
    <ContactStrip headline="A local lighting service, a direct conversation." />
  </>;
}