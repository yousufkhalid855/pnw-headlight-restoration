import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ContactStrip, Eyebrow, Photo } from "@/components/pnw/pnw-site";
import { ASSETS, BUSINESS } from "@/lib/pnw-data";
import { getPageOrigin } from "@/lib/meta.functions";
import { businessPageHead } from "@/lib/pnw-metadata";

export const Route = createFileRoute("/service-area")({
  loader: async () => ({ origin: await getPageOrigin() }),
  head: ({ loaderData }) => businessPageHead(loaderData.origin, "/service-area", "Bellingham Service Area | PnW Headlight Restoration", "PnW Headlight Restoration is located in Bellingham, Washington. Contact the business to confirm service availability for your location."),
  component: ServiceAreaPage,
});

function ServiceAreaPage() {
  return <>
    <section className="area-hero photo-hero"><div className="wrap area-hero__grid"><div className="area-hero__copy"><Eyebrow>Based in Bellingham, Washington</Eyebrow><h1>Lighting care,<br /><span>right here.</span></h1><p>PnW Headlight Restoration is based in Bellingham. Call to confirm service availability for your location.</p><div className="area-hero__actions"><Button asChild size="lg" className="action-link"><a href={BUSINESS.phoneHref}>Call {BUSINESS.phone}<Phone aria-hidden="true" /></a></Button><Button asChild variant="outline" size="lg" className="action-link"><a href={BUSINESS.mapsHref} target="_blank" rel="noreferrer">View address<MapPin aria-hidden="true" /></a></Button></div></div><div className="area-hero__photo"><Photo src={ASSETS.redAfter} alt="Vehicle in a supplied after-restoration photograph" eager /></div></div></section>
    <section className="area-address wrap"><div><Eyebrow>Primary location</Eyebrow><h2>Bellingham.</h2></div><a className="area-address__card" href={BUSINESS.mapsHref} target="_blank" rel="noreferrer"><MapPin aria-hidden="true" /><span><strong>PnW Headlight Restoration</strong>{BUSINESS.address}</span><span aria-hidden="true">↗</span></a></section>
    <section className="area-confirm"><div className="wrap area-confirm__inner"><Eyebrow>Have a location question?</Eyebrow><h2>Just <span>ask.</span></h2><p>Contact PnW directly to confirm whether service is available for your particular location. No service radius or additional locations are assumed.</p><Button asChild className="action-link"><a href={BUSINESS.phoneHref}>Call to confirm<Phone aria-hidden="true" /></a></Button></div></section>
    <ContactStrip headline="Local to Bellingham? Start a conversation." />
  </>;
}