import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { ActionLink, Eyebrow, PageIntro, ContactStrip } from "@/components/pnw/pnw-site";
import { ASSETS, SERVICES, type ServiceCategory } from "@/lib/pnw-data";
import { getPageOrigin } from "@/lib/meta.functions";
import { businessPageHead } from "@/lib/pnw-metadata";

export const Route = createFileRoute("/services/")({
  loader: async () => ({ origin: await getPageOrigin() }),
  head: ({ loaderData }) => pageHead(loaderData.origin),
  component: ServicesPage,
});

export function pageHead(origin: string) {
  const title = "Automotive Lighting Restoration Services | PnW Headlight Restoration";
  const description =
    "Explore all ten headlight, taillight, fog light, polishing, cleaning, and coating services offered by PnW in Bellingham, Washington.";
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${origin}/services` },
      { property: "og:image", content: `${origin}/images/pnw-logo-preview.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: `${origin}/images/pnw-logo-preview.jpg` },
    ],
    links: [{ rel: "canonical", href: `${origin}/services` }],
  };
}

const GROUP_COPY: Record<ServiceCategory, string> = {
  "Lighting restoration":
    "Restoring the look of headlights, taillights and fog lights that have turned cloudy, yellowed or worn.",
  "Refinishing & repair":
    "Wet sanding, polishing, cleaning and repair options for cloudy or foggy headlight lenses.",
  "Protection & finishing": "A UV coating and sealant option to ask about for your headlights.",
};

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function ServicesPage() {
  const groups: ServiceCategory[] = [
    "Lighting restoration",
    "Refinishing & repair",
    "Protection & finishing",
  ];
  return (
    <>
      <PageIntro
        image={ASSETS.silverAfter}
        eyebrow="Ten ways to care for your vehicle's lighting"
        title={
          <>
            Specialized care.
            <br />
            <span>Clear choices.</span>
          </>
        }
        description="From headlight and taillight restoration to polishing and UV coating, find the listed lighting service and get in touch to discuss your vehicle."
      >
        <ActionLink href="/request-a-quote">Ask about your vehicle</ActionLink>
      </PageIntro>
      <section className="services-showcase">
        <div className="wrap">
          <nav className="services-showcase__jump" aria-label="Service categories">
            {groups.map((group, index) => (
              <a key={group} href={`#${slug(group)}`}>
                <span>0{index + 1}</span>
                {group}
              </a>
            ))}
          </nav>
          {groups.map((group, categoryIndex) => {
            const entries = SERVICES.filter((service) => service.category === group);
            return (
              <section
                className="services-showcase__group"
                id={slug(group)}
                key={group}
                aria-labelledby={`${slug(group)}-title`}
              >
                <header className="services-showcase__head">
                  <span className="services-showcase__num" aria-hidden="true">
                    0{categoryIndex + 1}
                  </span>
                  <div>
                    <Eyebrow>
                      {String(entries.length).padStart(2, "0")}{" "}
                      {entries.length === 1 ? "service" : "services"}
                    </Eyebrow>
                    <h2 id={`${slug(group)}-title`}>{group}</h2>
                  </div>
                  <p>{GROUP_COPY[group]}</p>
                </header>
                <div className="services-showcase__grid">
                  {entries.map((service, index) => (
                    <a className="service-tile" href={service.href} key={service.name}>
                      <span className="service-tile__media">
                        <img src={service.image} alt="" loading="lazy" />
                        <span className="service-tile__index">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </span>
                      <span className="service-tile__body">
                        <span className="service-tile__title">{service.name}</span>
                        <span className="service-tile__text">{service.description}</span>
                        <span className="service-tile__more">
                          View service <ArrowUpRight aria-hidden="true" />
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
      <ContactStrip headline="Not sure which service suits your vehicle? Ask PnW." />
    </>
  );
}
