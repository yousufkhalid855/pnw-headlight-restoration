import { createFileRoute } from "@tanstack/react-router";

import { ContactStrip, Eyebrow, PageIntro } from "@/components/pnw/pnw-site";
import { ASSETS, BUSINESS } from "@/lib/pnw-data";
import { getPageOrigin } from "@/lib/meta.functions";
import { businessPageHead } from "@/lib/pnw-metadata";

const QUESTIONS = [
  ["What is headlight restoration?", "Headlight restoration addresses the worn, yellowed, oxidized, or cloudy appearance of vehicle headlight lenses. Contact PnW to discuss your vehicle and lens condition."],
  ["What types of headlights can be restored?", "Vehicle lenses vary. Call PnW with your vehicle make and model and a description of the condition to confirm which services may be available."],
  ["Do you offer taillight restoration?", "Yes. Taillight restoration is one of PnW Headlight Restoration's listed services. Contact PnW to discuss your vehicle's taillights."],
  ["Do you restore fog lights?", "Fog light restoration is one of PnW's listed lighting services. Get in touch to confirm availability for your vehicle."],
  ["What is headlight wet sanding and polishing?", "Headlight wet sanding and polishing, lens polishing, and cleaning are among PnW's listed services. Call to discuss the vehicle-specific options. This description does not imply a specific procedure or tools."],
  ["What is headlight UV coating and sealant?", "Headlight UV coating and sealant is a listed PnW service. Contact the business about product, process, or vehicle-specific questions."],
  ["Can yellowed or oxidized headlights be restored?", "PnW offers yellow headlight restoration and oxidized headlight restoration. Results vary by lens; contact PnW about your particular vehicle."],
  ["How can I request a restoration service?", `Call PnW at ${BUSINESS.phone} or visit the contact page to see the address and describe your vehicle and the service you're considering.`],
  ["Where is PnW Headlight Restoration located?", `The listed business address is ${BUSINESS.address}. Contact PnW to confirm service availability for your location.`],
  ["How much does a service cost, and when can I book?", "Call PnW directly to discuss pricing, availability, and your vehicle. Prices and appointment slots are not published on this website."],
] as const;

export const Route = createFileRoute("/faq")({ loader: () => getPageOrigin(), head: ({ loaderData }) => businessPageHead(loaderData, "/faq", "Headlight Restoration Questions | PnW Headlight Restoration", "Answers to common questions about the headlight, taillight, fog light, polishing, and UV coating services offered by PnW in Bellingham."), component: FAQPage });

function FAQPage() {
  return <>
    <PageIntro image={ASSETS.silverBefore} eyebrow="Answers before you call" title={<>Good to <span>know.</span></>} description="Questions about the lighting services PnW offers. Vehicle-specific details? Call PnW directly." />
    <section className="faq-section wrap"><div className="faq-intro"><Eyebrow>Frequently asked questions</Eyebrow><p>Don't see your question? Call PnW to ask about your vehicle.</p><a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a></div><div className="faq-list">{QUESTIONS.map(([question, answer], index) => <details className="faq-item" key={question}><summary><span className="faq-item__number">{String(index + 1).padStart(2, "0")}</span><span>{question}</span><span className="faq-item__toggle" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    <ContactStrip headline="Still have a question? Call PnW." />
  </>;
}