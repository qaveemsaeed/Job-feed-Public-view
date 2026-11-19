import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL, CONTACT_MAILTO, finalCta } from "@/content/landing";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="pb-16 md:pb-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-panel bg-panel px-6 py-16 text-center text-panel-foreground shadow-panel md:px-12 md:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-brand/20 hidden"
          />
          <h2 id="cta-title" className="relative mx-auto max-w-3xl text-4xl leading-[1.05] font-medium tracking-tight text-balance md:text-6xl">
            {finalCta.title}
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-lg text-panel-muted">{finalCta.body}</p>
          <div className="relative mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="inverse" size="pillLg" className="focus-visible:ring-offset-panel">
              <a href={finalCta.primary.href}>{finalCta.primary.label}</a>
            </Button>
            <Button asChild variant="inverseOutline" size="pillLg" className="focus-visible:ring-offset-panel">
              <a href={finalCta.secondary.href}>{finalCta.secondary.label}</a>
            </Button>
          </div>
          <p className="relative mt-8 text-sm text-panel-muted">
            {finalCta.contactLead}{" "}
            <a
              href={CONTACT_MAILTO}
              className="break-words text-panel-foreground underline decoration-panel-border underline-offset-4 hover:decoration-panel-ink"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
