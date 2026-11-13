const brandLogo = "/images/pnw-logo.png";
const brandLogoLight = "/images/pnw-logo-light.png";
import cloudyCloseup from "@/assets/pnw/cloudy-headlight-closeup.webp";
import clearDetail from "@/assets/pnw/clear-headlight-front-detail.webp";
import redComparison from "@/assets/pnw/red-car-before-after.webp";
import illustrativeComparison from "@/assets/pnw/illustrative-yellowed-headlight-comparison.webp";
import silverBefore from "@/assets/pnw/silver-car-headlight-before.webp";
import silverAfter from "@/assets/pnw/restored-silver-headlight.webp";
import redBefore from "@/assets/pnw/red-car-headlight-detail.webp";
import redAfter from "@/assets/pnw/red-car-headlight-restored.webp";

export const BUSINESS = {
  name: "PnW Headlight Restoration",
  phone: "(360) 521-2793",
  phoneHref: "tel:+13605212793",
  address: "3507 Skylark Loop, Bellingham, WA 98226",
  area: "Bellingham, Washington",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=3507+Skylark+Loop%2C+Bellingham%2C+WA+98226",
};

export const ASSETS = {
  logo: brandLogo,
  logoLight: brandLogoLight,
  hero: clearDetail,
  cloudyCloseup,
  clearDetail,
  redComparison,
  illustrativeComparison,
  silverBefore,
  silverAfter,
  redBefore,
  redAfter,
};

export type ServiceCategory = "Lighting restoration" | "Refinishing & repair" | "Protection & finishing";

export interface Service {
  name: string;
  href: ServicePath;
  category: ServiceCategory;
  description: string;
  image: string;
}

export type ServicePath =
  | "/services/headlight-restoration"
  | "/services/taillight-restoration"
  | "/services/fog-light-restoration"
  | "/services/wet-sanding-polishing"
  | "/services/uv-coating"
  | "/services/yellow-oxidized-headlights";

export const SERVICES: Service[] = [
  {
    name: "Headlight Restoration",
    href: "/services/headlight-restoration",
    category: "Lighting restoration",
    description: "Restore the appearance of cloudy, yellowed, or worn-looking headlights.",
    image: ASSETS.clearDetail,
  },
  {
    name: "Taillight Restoration",
    href: "/services/taillight-restoration",
    category: "Lighting restoration",
    description: "Refresh the appearance of cloudy or aged taillight lenses.",
    image: ASSETS.redAfter,
  },
  {
    name: "Fog Light Restoration",
    href: "/services/fog-light-restoration",
    category: "Lighting restoration",
    description: "Ask about restoring the appearance of fog lights on your vehicle.",
    image: ASSETS.silverAfter,
  },
  {
    name: "Yellow Headlight Restoration",
    href: "/services/yellow-oxidized-headlights",
    category: "Lighting restoration",
    description: "Address the yellowed appearance of aging headlight lenses.",
    image: ASSETS.cloudyCloseup,
  },
  {
    name: "Oxidized Headlight Restoration",
    href: "/services/yellow-oxidized-headlights",
    category: "Lighting restoration",
    description: "Explore restoration options for cloudy-looking, oxidized lenses.",
    image: ASSETS.silverBefore,
  },
  {
    name: "Headlight Wet Sanding and Polishing",
    href: "/services/wet-sanding-polishing",
    category: "Refinishing & repair",
    description: "Ask about wet sanding and polishing for a headlight lens.",
    image: ASSETS.redBefore,
  },
  {
    name: "Headlight Lens Polishing",
    href: "/services/wet-sanding-polishing",
    category: "Refinishing & repair",
    description: "Explore polishing options for the appearance of headlight lenses.",
    image: ASSETS.clearDetail,
  },
  {
    name: "Foggy Headlight Repair",
    href: "/services/fog-light-restoration",
    category: "Refinishing & repair",
    description: "Discuss a cloudy or foggy-looking headlight with PnW.",
    image: ASSETS.cloudyCloseup,
  },
  {
    name: "Headlight Cleaning",
    href: "/services/wet-sanding-polishing",
    category: "Refinishing & repair",
    description: "Ask about headlight lens cleaning and appearance services.",
    image: ASSETS.redAfter,
  },
  {
    name: "Headlight UV Coating and Sealant",
    href: "/services/uv-coating",
    category: "Protection & finishing",
    description: "Contact PnW to ask about headlight UV coating and sealant.",
    image: ASSETS.silverAfter,
  },
];

export interface ServicePage {
  title: string;
  eyebrow: string;
  description: string;
  detail: string;
  image: string;
  imageAlt: string;
  services: string[];
}

export const SERVICE_PAGES: Record<string, ServicePage> = {
  "/services/headlight-restoration": {
    title: "Headlight Restoration",
    eyebrow: "Our signature service",
    description:
      "A fresh look starts right at the front. Ask PnW about restoring headlights with a cloudy, yellowed, or oxidized appearance.",
    detail:
      "Headlight restoration focuses on refreshing the appearance of the headlight lenses already on your vehicle. Results depend on the specific vehicle and lens condition; call to discuss what you are seeing.",
    image: ASSETS.cloudyCloseup,
    imageAlt: "Vehicle headlight with masking tape, photographed before restoration",
    services: ["Headlight Restoration", "Yellow Headlight Restoration", "Oxidized Headlight Restoration"],
  },
  "/services/wet-sanding-polishing": {
    title: "Wet Sanding & Polishing",
    eyebrow: "Lens refinishing",
    description:
      "Explore headlight wet sanding, lens polishing, and cleaning for headlights that have lost their clear appearance.",
    detail:
      "PnW offers headlight wet sanding and polishing, headlight lens polishing, foggy headlight repair, and headlight cleaning. Contact the business to find out which service suits your specific vehicle and lenses.",
    image: ASSETS.redBefore,
    imageAlt: "Close-up of a vehicle headlight before restoration",
    services: ["Headlight Wet Sanding and Polishing", "Headlight Lens Polishing", "Headlight Cleaning", "Foggy Headlight Repair"],
  },
  "/services/taillight-restoration": {
    title: "Taillight Restoration",
    eyebrow: "Rear lighting",
    description:
      "Refresh the appearance of cloudy or aged-looking taillight lenses with dedicated restoration service from PnW.",
    detail:
      "PnW offers taillight restoration. Every vehicle and lens is different, so call to discuss your taillights and the service available for them.",
    image: ASSETS.redAfter,
    imageAlt: "Clear-looking rear lighting and vehicle detail in the supplied photo",
    services: ["Taillight Restoration"],
  },
  "/services/fog-light-restoration": {
    title: "Fog Light Restoration",
    eyebrow: "Front-end details",
    description:
      "Ask about fog light restoration and foggy headlight repair to address the look of aging vehicle lenses.",
    detail:
      "PnW offers fog light restoration and foggy headlight repair. Call with your make and model to discuss whether these services are available for your vehicle.",
    image: ASSETS.clearDetail,
    imageAlt: "Clear-looking vehicle headlight close-up from the supplied restoration photographs",
    services: ["Fog Light Restoration", "Foggy Headlight Repair"],
  },
  "/services/uv-coating": {
    title: "UV Coating & Headlight Sealant",
    eyebrow: "Protection & finishing",
    description:
      "Ask PnW about headlight UV coating and sealant as part of your vehicle's lighting restoration needs.",
    detail:
      "Headlight UV coating and sealant are among PnW's listed services. For questions about suitability for your vehicle, any product details, or the service itself, contact PnW directly.",
    image: ASSETS.silverAfter,
    imageAlt: "Close-up of a restored-looking vehicle headlight from the supplied photographs",
    services: ["Headlight UV Coating and Sealant"],
  },
  "/services/yellow-oxidized-headlights": {
    title: "Yellow & Oxidized Headlights",
    eyebrow: "Cloudy lens restoration",
    description:
      "Yellowed, oxidized, or foggy-looking lenses can change the appearance of your vehicle. Ask PnW about restoration.",
    detail:
      "PnW offers yellow headlight restoration, oxidized headlight restoration, and foggy headlight repair. Discuss your vehicle's condition directly with the business; restoration results depend on the individual lens.",
    image: ASSETS.cloudyCloseup,
    imageAlt: "Cloudy vehicle headlight photographed before restoration",
    services: ["Yellow Headlight Restoration", "Oxidized Headlight Restoration", "Foggy Headlight Repair"],
  },
};

export const MAIN_NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Service area", href: "/service-area" },
  { label: "Contact", href: "/contact" },
] as const;

export const QUOTE_SERVICES = SERVICES.map((service) => service.name);