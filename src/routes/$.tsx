import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Eyebrow } from "@/components/pnw/pnw-site";
import { businessPageHead } from "@/lib/pnw-metadata";
import { getPageOrigin } from "@/lib/meta.functions";

export const Route = createFileRoute("/$")({ loader: () => getPageOrigin(), head: ({ loaderData }) => ({ ...businessPageHead(loaderData, "/404", "Page Not Found | PnW Headlight Restoration", "This page could not be found. Explore PnW Headlight Restoration services in Bellingham, Washington."), meta: [...businessPageHead(loaderData, "/404", "Page Not Found | PnW Headlight Restoration", "This page could not be found. Explore PnW Headlight Restoration services in Bellingham, Washington.").meta, { name: "robots", content: "noindex, follow" }] }), component: NotFoundPage });

function NotFoundPage() {
  return <section className="not-found wrap"><Eyebrow>PnW Headlight Restoration · Bellingham</Eyebrow><span className="not-found__number">404</span><h1>Wrong turn.<br /><span>Easy return.</span></h1><p>This page isn't available. Head back to the home page or explore the restoration services.</p><Link to="/" className="not-found__link"><ArrowLeft aria-hidden="true" /> Back to home</Link></section>;
}