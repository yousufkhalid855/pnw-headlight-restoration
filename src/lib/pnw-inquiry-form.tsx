import { useId, useState, type FormEvent } from "react";
import { ArrowUpRight, ImagePlus, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BUSINESS, QUOTE_SERVICES } from "@/lib/pnw-data";

export function BusinessInquiryForm({ mode }: { mode: "contact" | "quote" }) {
  const formId = useId();
  const [submissionNotice, setSubmissionNotice] = useState("");
  const [fileName, setFileName] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;

    // No form service is configured. Never report an inquiry as sent when it
    // has not left the visitor's browser.
    setSubmissionNotice(`Your message hasn't been sent. Call PnW directly at ${BUSINESS.phone} to discuss your vehicle.`);
  }

  const isQuote = mode === "quote";

  return (
    <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
      <div className="inquiry-form__intro">
        <span>{isQuote ? "Vehicle restoration inquiry" : "Contact PnW"}</span>
        <h2>{isQuote ? "Tell us about your vehicle." : "Start a conversation."}</h2>
        <p>Complete the details below. This website does not transmit or store submissions; call PnW directly to contact the business.</p>
      </div>

      <div className="inquiry-form__fields">
        <label htmlFor={`${formId}-name`}>{isQuote ? "Full name" : "Name"}<span aria-hidden="true">*</span><Input id={`${formId}-name`} name="name" autoComplete="name" required maxLength={120} placeholder="Your name" /></label>
        <label htmlFor={`${formId}-phone`}>Phone number<span aria-hidden="true">*</span><Input id={`${formId}-phone`} name="phone" type="tel" autoComplete="tel" required maxLength={30} placeholder="(360) 555-0100" /></label>
        <label htmlFor={`${formId}-email`}>Email address<Input id={`${formId}-email`} name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" /></label>
        <label htmlFor={`${formId}-vehicle`}>Vehicle make and model<Input id={`${formId}-vehicle`} name="vehicle" maxLength={100} placeholder="Year, make and model" /></label>
        <label htmlFor={`${formId}-service`} className="inquiry-form__full">Service you’re interested in
          <select id={`${formId}-service`} name="service" defaultValue="">
            <option value="">Choose a service (optional)</option>
            {QUOTE_SERVICES.map((service) => <option key={service} value={service}>{service}</option>)}
          </select>
        </label>
        {isQuote && <label htmlFor={`${formId}-condition`} className="inquiry-form__full">Describe the headlight or taillight condition<textarea id={`${formId}-condition`} name="condition" rows={3} maxLength={2000} placeholder="What are you noticing about the lenses?" /></label>}
        <label htmlFor={`${formId}-message`} className="inquiry-form__full">{isQuote ? "Additional details" : "Message"}<Textarea id={`${formId}-message`} name="message" rows={4} maxLength={3000} placeholder={isQuote ? "Anything else about your vehicle or service?" : "How can PnW help?"} /></label>
        {isQuote && <label htmlFor={`${formId}-photo`} className="inquiry-form__full inquiry-file-label"><span>Vehicle photograph <span>(optional; stays on your device)</span></span><span className="inquiry-file-label__control"><ImagePlus aria-hidden="true" />{fileName || "Choose a photo"}<input id={`${formId}-photo`} name="photo" type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(event) => setFileName(event.currentTarget.files?.[0]?.name ?? "")} /></span></label>}
      </div>

      <div className="inquiry-form__submit"><Button type="submit" size="lg">{isQuote ? "Review inquiry" : "Review message"}<ArrowUpRight aria-hidden="true" /></Button><p>Not transmitted. Call PnW to get in touch.</p></div>
      {submissionNotice && <p className="inquiry-form__notice" role="status"><Phone aria-hidden="true" />{submissionNotice} <a href={BUSINESS.phoneHref}>Call {BUSINESS.phone}</a></p>}
    </form>
  );
}