export function businessPageHead(origin: string, path: string, title: string, description: string) {
  const url = origin ? `${origin}${path}` : undefined;
  const image = origin ? `${origin}/images/pnw-logo-preview.jpg` : undefined;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "author", content: "PnW Headlight Restoration" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(url ? [{ property: "og:url", content: url }] : []),
      ...(image ? [
        { property: "og:image", content: image },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:image", content: image },
      ] : []),
    ],
    links: url ? [{ rel: "canonical", href: url }] : [],
  };
}