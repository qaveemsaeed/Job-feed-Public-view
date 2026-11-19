import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { nav, site } from "@/content/landing";
import { cn } from "@/lib/utils";

export function Wordmark() {
  return (
    <a
      href="/#top"
      className="group inline-flex items-center gap-2 rounded-full text-foreground"
      aria-label={`${site.name}, back to top`}
    >
      <span
        aria-hidden="true"
        className="grid size-7 place-items-center rounded-lg bg-panel text-panel-foreground"
      >
        <span className="flex flex-col gap-[3px]">
          <span className="block h-[2px] w-3.5 rounded bg-brand" />
          <span className="block h-[2px] w-2.5 rounded bg-panel-foreground/70" />
          <span className="block h-[2px] w-3 rounded bg-panel-foreground/40" />
        </span>
      </span>
      <span className="font-display text-xl tracking-tight">{site.name}</span>
    </a>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md transition-colors",
        scrolled ? "border-border bg-background/85" : "border-transparent bg-background/60",
      )}
    >
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-4">
        <Wordmark />

        <ul className="hidden items-center gap-0.5 lg:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href.startsWith("#") ? `/${link.href}` : link.href}
                className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button asChild variant="brand" size="pill" className="hidden sm:inline-flex">
            <a href={`/${nav.cta.href}`}>{nav.cta.label}</a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="quiet"
                size="icon"
                className="min-h-11 min-w-11 rounded-full lg:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(20rem,85vw)] bg-background">
              <SheetTitle className="font-display text-xl font-normal">{site.name}</SheetTitle>
              <ul className="mt-8 flex flex-col gap-1">
                {nav.links.map((link) => (
                  <li key={link.href}>
                    <SheetClose asChild>
                      <a
                        href={link.href.startsWith("#") ? `/${link.href}` : link.href}
                        className="block rounded-xl px-3 py-3 text-base text-foreground hover:bg-secondary"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <SheetClose asChild>
                <Button asChild variant="brand" size="pillLg" className="mt-6 w-full">
                  <a href={`/${nav.cta.href}`}>{nav.cta.label}</a>
                </Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
