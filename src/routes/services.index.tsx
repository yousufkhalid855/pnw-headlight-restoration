import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { ActionLink, Eyebrow, PageIntro, ContactStrip } from "@/components/pnw/pnw-site";
import { SERVICES, type ServiceCategory } from "@/lib/pnw-data";
import { getPageOrigin } from "@/lib/meta.functions";
import { businessPageHead } from "@/lib/pnw-metadata";

export const Route = createFileRoute("/services/")({
  loader: async () => ({ origin: await getPageOrigin() }),
  head: ({ loaderData }) => pageHead(loaderData.origin),
  component: ServicesPage,
});

export function pageHead(origin: string) {
  const title = "Automotive Lighting Restoration Services | PnW Headlight Restoration";
  const description = "Explore all ten headlight, taillight, fog light, polishing, cleaning, and coating services offered by PnW in Bellingham, Washington.";
  return {
    meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { property: "og:url", content: `${origin}/services` },
      { property: "og:image", content: `${origin}/images/pnw-logo-preview.jpg` },
      { name: "twitter:card", content: "summary_large_image" }, { name: "twitter:title", content: title },
      { name: "twitter:description", content: description }, { name: "twitter:image", content: `${origin}/images/pnw-logo-preview.jpg` },
    ],
    links: [{ rel: "canonical", href: `${origin}/services` }],
  };
}

function ServicesPage() {
  const groups: ServiceCategory[] = ["Lighting restoration", "Refinishing & repair", "Protection & finishing"];
  return (
    <>
      <PageIntro eyebrow="Ten ways to care for your vehicle's lighting" title={<>Specialized care.<br /><span>Clear choices.</span></>} description="From headlight and taillight restoration to polishing and UV coating, find the listed lighting service and get in touch to discuss your vehicle." >
        <ActionLink href="/request-a-quote">Ask about your vehicle</ActionLink>
      </PageIntro>
      <section className="services-page wrap">
        {groups.map((group, categoryIndex) => {
          const entries = SERVICES.filter((service) => service.category === group);
          return (
            <div className="services-page__group" key={group}>
              <div className="services-page__category"><Eyebrow>0{categoryIndex + 1}</Eyebrow><h2>{group}</h2><span>{String(entries.length).padStart(2, "0")} listed</span></div>
              <div className="services-page__entries">{entries.map((service, index) => (
                <a className="services-page__entry" href={service.href} key={service.name}>
                  <span className="services-page__entry-index">{String(index + 1).padStart(2, "0")}</span><span>{service.name}</span><p>{service.description}</p><ArrowUpRight aria-hidden="true" />
                </a>
              ))}</div>
            </div>
          );
        })}
      </section>
      <ContactStrip headline="Not sure which service suits your vehicle? Ask PnW." />
    </>
  );
}