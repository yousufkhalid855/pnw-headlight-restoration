import { createFileRoute, Link } from "@tanstack/react-router";

import { Eyebrow } from "@/components/pnw/pnw-site";
import { BUSINESS } from "@/lib/pnw-data";
import { businessPageHead } from "@/lib/pnw-metadata";
import { getPageOrigin } from "@/lib/meta.functions";

export const Route = createFileRoute("/privacy-policy")({ loader: () => getPageOrigin(), head: ({ loaderData }) => businessPageHead(loaderData, "/privacy-policy", "Privacy Policy | PnW Headlight Restoration", "Read the privacy information and contact details for PnW Headlight Restoration in Bellingham, Washington."), component: PrivacyPage });

function PrivacyPage() {
  return <>
    <section className="legal-header"><div className="wrap"><Eyebrow>PnW Headlight Restoration</Eyebrow><h1>Privacy<br /><span>information.</span></h1><p>An important note about the website's inquiry forms.</p></div></section>
    <article className="legal-content wrap"><p className="legal-updated">Website information · Bellingham, Washington</p><h2>Inquiry forms on this website</h2><p>Contact and quote forms on this website are demonstrations for collecting the information visitors might wish to include in an inquiry. There is no connected service to transmit or store a form submission. Submitting a form does not contact PnW, and the form clearly directs visitors to call the business instead.</p><p>The optional photo picker in the quote form only displays the selected filename on your device. This website does not upload the selected photo.</p><h2>Contacting PnW</h2><p>For information about how PnW handles information shared directly with the business, please ask PnW directly. Do not include sensitive personal information in this website's forms.</p><p><a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a><br />{BUSINESS.address}</p><h2>Changes and questions</h2><p>This general website information does not replace a business-specific legal privacy statement. Contact PnW with any questions about information you provide to the business.</p><Link className="legal-back" to="/contact">Contact PnW</Link></article>
  </>;
}