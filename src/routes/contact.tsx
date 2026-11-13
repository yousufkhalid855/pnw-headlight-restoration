import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";

import { BusinessInquiryForm } from "@/lib/pnw-inquiry-form";
import { Eyebrow } from "@/components/pnw/pnw-site";
import { BUSINESS } from "@/lib/pnw-data";
import { businessPageHead } from "@/lib/pnw-metadata";
import { getPageOrigin } from "@/lib/meta.functions";

export const Route = createFileRoute("/contact")({ loader: () => getPageOrigin(), head: ({ loaderData }) => businessPageHead(loaderData, "/contact", "Contact PnW Headlight Restoration | Bellingham", "Call PnW Headlight Restoration at (360) 521-2793, visit the Bellingham address, or prepare your vehicle inquiry."), component: ContactPage });

function ContactPage() {
  return <>
    <section className="contact-page-header"><div className="wrap"><Eyebrow>We're here in Bellingham</Eyebrow><h1>Let's talk about<br /><span>your vehicle.</span></h1><p>Call PnW directly or prepare your inquiry below. No form messages are sent by this website.</p><a className="contact-page-header__phone" href={BUSINESS.phoneHref}><Phone aria-hidden="true" />{BUSINESS.phone}<ArrowUpRight aria-hidden="true" /></a></div></section>
    <section className="contact-details wrap"><article><MapPin aria-hidden="true" /><div><span>Business address</span><a href={BUSINESS.mapsHref} target="_blank" rel="noreferrer">{BUSINESS.address}<ArrowUpRight aria-hidden="true" /></a></div></article><article><Phone aria-hidden="true" /><div><span>Phone</span><a href={BUSINESS.phoneHref}>{BUSINESS.phone}<ArrowUpRight aria-hidden="true" /></a></div></article><article><span className="contact-details__dot" aria-hidden="true" /><div><span>Service location</span><Link to="/service-area">Bellingham, Washington<ArrowUpRight aria-hidden="true" /></Link></div></article></section>
    <section className="form-section"><div className="wrap form-section__layout"><div className="form-section__intro"><Eyebrow>Vehicle lighting restoration</Eyebrow><h2>Describe what<br />you've <span>noticed.</span></h2><p>Include the vehicle, which lenses you are asking about, and anything you'd like PnW to know. You can also call the business directly.</p><a href={BUSINESS.phoneHref}>{BUSINESS.phone}<ArrowUpRight aria-hidden="true" /></a></div><BusinessInquiryForm mode="contact" /></div></section>
  </>;
}