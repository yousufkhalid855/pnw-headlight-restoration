import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

/** Returns the public origin of the request for Vercel-compatible page metadata. */
export const getPageOrigin = createServerFn({ method: "GET" }).handler(() => {
  const request = getRequest();
  const requestUrl = new URL(request.url);

  return requestUrl.origin;
});