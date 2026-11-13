import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { SiteLayout } from "@/components/pnw/pnw-site";

import appCss from "../styles.css?url";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/pnw/pnw-site";

function NotFoundComponent() {
  return (
    <div className="root-fallback">
      <BrandLogo />
      <h1>This page couldn't be found.</h1>
      <Button asChild>
        <Link to="/">Back to the PnW home page</Link>
      </Button>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  useEffect(() => {
    console.error("PnW Headlight Restoration page error:", error);
  }, [error]);

  return (
    <div className="root-fallback">
      <BrandLogo />
      <h1>We couldn't load this page.</h1>
      <p>Please try again, or contact PnW Headlight Restoration directly.</p>
      <div className="root-fallback__actions">
        <Button
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link to="/">Back to the home page</Link>
        </Button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:site_name", content: "PnW Headlight Restoration" },
      { name: "theme-color", content: "#102848" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "64x64" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SiteLayout>
        <Outlet />
      </SiteLayout>
    </QueryClientProvider>
  );
}
