import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ASSETS, BUSINESS, MAIN_NAV, SERVICES, type Service, type ServicePath } from "@/lib/pnw-data";

export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <img
      src={ASSETS.logo}
      className={className}
      width={910}
      height={212}
      alt="PnW Headlight Restoration"
    />
  );
}

function SiteHeader() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link aria-label="PnW Headlight Restoration home" to="/" className="brand-link">
          <BrandLogo className="site-header__logo" />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              activeOptions={{ exact: item.href === "/" }}
              activeProps={{ className: "nav-link nav-link--active" }}
              inactiveProps={{ className: "nav-link" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild variant="default" className="header-cta">
          <Link to="/request-a-quote">
            Get in touch <ArrowUpRight aria-hidden="true" />
          </Link>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="mobile-menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      <div className={`mobile-nav${menuOpen ? " mobile-nav--open" : ""}`} id="mobile-navigation" hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {MAIN_NAV.map((item, index) => (
            <Link key={item.label} to={item.href}>
              <span className="mobile-nav__number">0{index + 1}</span>
              <span>{item.label}</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
          <Link className="mobile-nav__cta" to="/request-a-quote">
            Get in touch <ArrowUpRight aria-hidden="true" />
          </Link>
          <a href={BUSINESS.phoneHref} className="mobile-nav__phone">
            <Phone aria-hidden="true" /> {BUSINESS.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main wrap">
        <div className="site-footer__identity">
          <Link to="/" aria-label="PnW Headlight Restoration home">
            <BrandLogo className="site-footer__logo" />
          </Link>
          <p>Automotive lighting restoration in Bellingham, Washington.</p>
          <a className="footer-phone" href={BUSINESS.phoneHref}>
            <Phone aria-hidden="true" /> {BUSINESS.phone} <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <div className="site-footer__links">
          <div>
            <p className="footer-label">Explore</p>
            {([
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: "About", href: "/about" },
              { label: "Gallery", href: "/gallery" },
            ] as const).map((item) => (
              <Link key={item.href} to={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <p className="footer-label">Lighting care</p>
            {SERVICES.slice(0, 4).map((service) => (
              <ServicePageLink key={service.name} href={service.href}>
                {service.name}
              </ServicePageLink>
            ))}
            <Link to="/services">All services</Link>
          </div>
          <div>
            <p className="footer-label">Find us</p>
            <a href={BUSINESS.mapsHref} target="_blank" rel="noreferrer">
              <MapPin aria-hidden="true" />
              {BUSINESS.address}
            </a>
            <Link to="/service-area">Bellingham, Washington</Link>
            <Link to="/privacy-policy">Privacy policy</Link>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom wrap">
        <span>© {new Date().getFullYear()} PnW Headlight Restoration</span>
        <span>Bellingham, Washington</span>
        <a href={BUSINESS.phoneHref}>Call {BUSINESS.phone}</a>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const curtainRef = useRef<HTMLDivElement>(null);
  const firstPath = useRef(pathname);
  const [preloaderFinished, setPreloaderFinished] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let exitAnimation: { kill: () => void } | undefined;

    async function exitInitialCurtain() {
      const [{ default: gsap }] = await Promise.all([import("gsap")]);
      if (cancelled || !curtainRef.current) return;
      const curtain = curtainRef.current;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(curtain, { y: 0, yPercent: -105 });
        setPreloaderFinished(true);
        return;
      }
      // Clear the CSS translateY(102%) GSAP reads as a fixed pixel offset, or the
      // curtain stops near the top of the screen and keeps covering the page.
      exitAnimation = gsap.to(curtain, {
        y: 0,
        yPercent: -105,
        duration: 0.8,
        delay: 0.7,
        ease: "power3.inOut",
        onComplete: () => setPreloaderFinished(true),
      });
    }

    void exitInitialCurtain();
    return () => {
      cancelled = true;
      exitAnimation?.kill();
    };
  }, []);

  useEffect(() => {
    if (firstPath.current === pathname) return;
    firstPath.current = pathname;
    let cancelled = false;
    let transition: { kill: () => void } | undefined;

    async function animateRoute() {
      const [{ default: gsap }] = await Promise.all([import("gsap")]);
      if (cancelled || !curtainRef.current) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const curtain = curtainRef.current;
      if (reduced) {
        gsap.set(curtain, { y: 0, yPercent: -105 });
        return;
      }
      gsap.set(curtain, { y: 0, yPercent: 100 });
      transition = gsap.timeline().to(curtain, {
        yPercent: 0,
        duration: 0.4,
        ease: "power3.inOut",
      }).to(curtain, {
        yPercent: -105,
        duration: 0.65,
        delay: 0.08,
        ease: "power3.inOut",
      });
    }

    void animateRoute();
    return () => {
      cancelled = true;
      transition?.kill();
    };
  }, [pathname]);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    async function initSmoothScroll() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const [{ default: gsap }, { default: Lenis }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("lenis"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ smoothWheel: true, autoRaf: false });
      const tick = (seconds: number) => lenis.raf(seconds * 1000);
      gsap.ticker.add(tick);
      lenis.on("scroll", ScrollTrigger.update);
      ScrollTrigger.refresh();
      cleanup = () => {
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
        gsap.ticker.remove(tick);
      };
    }

    void initSmoothScroll();
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      {!preloaderFinished && (
        <div className="site-preloader" aria-label="Loading PnW Headlight Restoration" aria-live="polite">
          <BrandLogo className="site-preloader__logo" />
          <div className="site-preloader__track"><span /></div>
          <span className="site-preloader__label">Bellingham, Washington</span>
        </div>
      )}
      <div ref={curtainRef} className="route-curtain" aria-hidden="true">
        <BrandLogo className="route-curtain__logo" />
        <span className="route-curtain__label">{BUSINESS.area}</span>
      </div>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <SiteFooter />
    </>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow"><span aria-hidden="true" />{children}</span>;
}

export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-intro">
      <div className="wrap page-intro__inner">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{description}</p>
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  dark?: boolean;
}) {
  return (
    <div className={`section-heading${dark ? " section-heading--dark" : ""}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function ActionLink({
  href,
  children,
  variant = "default",
}: {
  href: string;
  children: ReactNode;
  variant?: "default" | "outline" | "secondary";
}) {
  return (
    <Button asChild variant={variant} size="lg" className="action-link">
      <Link to={href}>{children}<ArrowUpRight aria-hidden="true" /></Link>
    </Button>
  );
}

/** Maps a business-facing service path onto the dynamic TanStack detail page. */
export function ServicePageLink({
  href,
  children,
  className,
}: {
  href: ServicePath;
  children: ReactNode;
  className?: string;
}) {
  const slug = href.replace(/^\/services\//, "");
  return (
    <Link className={className} to="/services/$slug" params={{ slug }}>
      {children}
    </Link>
  );
}

export function Photo({
  src,
  alt,
  className = "",
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
    />
  );
}

export function ContactStrip({
  headline = "Talk to PnW about your headlights.",
}: {
  headline?: string;
}) {
  return (
    <section className="contact-strip">
      <div className="wrap contact-strip__inner">
        <div><Eyebrow>Start with a conversation</Eyebrow><h2>{headline}</h2></div>
        <div className="contact-strip__actions">
          <Button asChild size="lg" className="action-link">
            <a href={BUSINESS.phoneHref}>Call {BUSINESS.phone}<Phone aria-hidden="true" /></a>
          </Button>
          <Button asChild variant="outline" size="lg" className="action-link">
            <Link to="/contact">Contact details<ArrowUpRight aria-hidden="true" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function ServiceRow({ service, index }: { service: Service; index: number }) {
  return (
    <ServicePageLink className="service-row" href={service.href}>
      <span className="service-row__number">{String(index + 1).padStart(2, "0")}</span>
      <span className="service-row__name">{service.name}</span>
      <span className="service-row__detail">{service.description}</span>
      <ArrowUpRight className="service-row__arrow" aria-hidden="true" />
    </ServicePageLink>
  );
}

export function ServiceCategories({ services }: { services?: Service[] }) {
  const list = services ?? SERVICES;
  const groups = ["Lighting restoration", "Refinishing & repair", "Protection & finishing"] as const;
  return (
    <div className="service-categories">
      {groups.map((category) => {
        const members = list.filter((service) => service.category === category);
        if (!members.length) return null;
        return (
          <section className="service-group" key={category}>
            <div className="service-group__label">
              <span>{category}</span><span>{String(members.length).padStart(2, "0")} services</span>
            </div>
            <div>{members.map((service, index) => (
              <ServiceRow key={service.name} service={service} index={index + 1} />
            ))}</div>
          </section>
        );
      })}
    </div>
  );
}

export function NoteBanner({ children }: { children: ReactNode }) {
  return <p className="note-banner"><Check aria-hidden="true" /><span>{children}</span></p>;
}

export function ContinueLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link className="continue-link" to={href}>{children}<ChevronRight aria-hidden="true" /></Link>;
}

export function DownCue({ href }: { href: string }) {
  return <a className="down-cue" href={href}><ArrowDown aria-hidden="true" /> Scroll to explore</a>;
}

export function InlineAction({ href, children }: { href: string; children: ReactNode }) {
  return <Link className="inline-action" to={href}>{children}<ArrowRight aria-hidden="true" /></Link>;
}