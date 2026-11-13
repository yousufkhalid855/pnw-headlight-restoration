import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Phone } from "lucide-react";

import { BusinessInquiryForm } from "@/lib/pnw-inquiry-form";
import { Eyebrow, HeroBackdrop } from "@/components/pnw/pnw-site";
import { ASSETS, BUSINESS } from "@/lib/pnw-data";
import { businessPageHead } from "@/lib/pnw-metadata";
import { getPageOrigin } from "@/lib/meta.functions";

export const Route = createFileRoute("/request-a-quote")({ loader: () => getPageOrigin(), head: ({ loaderData }) => businessPageHead(loaderData, "/request-a-quote", "Request a Restoration Quote | PnW Headlight Restoration", "Describe your vehicle and restoration needs to prepare an inquiry for PnW Headlight Restoration in Bellingham. Call (360) 521-2793."), component: QuotePage });

function QuotePage() {
  return <>
    <section className="quote-page-header photo-hero"><HeroBackdrop src={ASSETS.clearDetail} /><div className="wrap"><Link className="quote-back" to="/services"><ArrowLeft aria-hidden="true" /> Explore services</Link><Eyebrow>A vehicle-specific inquiry</Eyebrow><h1>Your vehicle.<br />Your <span>questions.</span></h1><p>Share the details you have in mind. Then call PnW to discuss service availability and any questions about your vehicle.</p><a href={BUSINESS.phoneHref}><Phone aria-hidden="true" />{BUSINESS.phone}</a></div></section>
    <section className="form-section"><div className="wrap form-section__layout form-section__layout--quote"><div className="form-section__intro"><Eyebrow>Before your inquiry</Eyebrow><h2>Specifics help<br />start the <span>conversation.</span></h2><p>Choose from the ten listed vehicle lighting services. Pricing and appointment availability are confirmed directly with PnW.</p></div><BusinessInquiryForm mode="quote" /></div></section>
  </>;
}