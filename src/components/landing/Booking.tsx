import { Check, ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKING_PAGE_URL, BOOKING_URL, CONTACT_EMAIL, CONTACT_MAILTO, booking } from "@/content/landing";
import { cn } from "@/lib/utils";

type Props = {
  /** Defaults to BOOKING_URL from the content file. A non-empty link shows the embedded scheduler. */
  bookingUrl?: string;
  /** Link for the "Open booking page" fallback button. */
  bookingPageUrl?: string;
};

export function Booking({ bookingUrl = BOOKING_URL, bookingPageUrl = BOOKING_PAGE_URL }: Props) {
  const url = bookingUrl.trim();
  const pageUrl = bookingPageUrl.trim() || url;
  const hasScheduler = url.length > 0;

  return (
    <section id="book" aria-labelledby="book-title" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-page">
        <div
          className={cn(
            "relative overflow-hidden rounded-panel bg-panel p-6 text-panel-foreground shadow-panel sm:p-10 md:p-12",
            "grid gap-10",
            !hasScheduler && "lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14",
          )}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -left-24 size-[26rem] rounded-full bg-brand/15 hidden"
          />

          <div className="relative">
            <p className="eyebrow text-panel-ink">{booking.eyebrow}</p>
            <h2
              id="book-title"
              className="mt-3 text-4xl leading-[1.05] font-medium tracking-tight text-balance md:text-5xl"
            >
              <NoBreakHyphens text={booking.title} />
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-pretty text-panel-muted">{booking.pitch}</p>

            <h3 className="mt-8 font-sans text-xs font-medium tracking-wider text-panel-muted uppercase">
              {booking.coversLabel}
            </h3>
            <ul className="mt-4 space-y-3">
              {booking.covers.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-[3px] bg-brand-soft text-panel-ink"
                  >
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {hasScheduler ? <SchedulerEmbed url={url} pageUrl={pageUrl} /> : <RequestCard />}
        </div>
      </div>
    </section>
  );
}

/** Keeps hyphenated words like "30-minute" on one line in large headings. */
function NoBreakHyphens({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i}>
          {i > 0 && " "}
          {word.includes("-") ? <span className="whitespace-nowrap">{word}</span> : word}
        </span>
      ))}
    </>
  );
}

function SchedulerEmbed({ url, pageUrl }: { url: string; pageUrl: string }) {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-card border border-panel-border bg-background">
        <iframe
          src={url}
          title={booking.embed.title}
          loading="lazy"
          className="block h-[680px] w-full border-0 md:h-[720px]"
        />
      </div>
      <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-panel-muted">{booking.embed.fallbackHint}</p>
        <Button asChild variant="inverseOutline" size="pill" className="focus-visible:ring-offset-panel">
          <a href={pageUrl} target="_blank" rel="noopener noreferrer">
            {booking.embed.openLabel}
            <ExternalLink aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </Button>
      </div>
    </div>
  );
}

function RequestCard() {
  return (
    <div className="relative rounded-card border border-panel-border bg-panel-raised p-6 sm:p-8">
      <span
        aria-hidden="true"
        className="grid size-11 place-items-center rounded-[3px] bg-brand-soft text-panel-ink"
      >
        <Mail className="size-5" />
      </span>
      <h3 className="mt-5 font-display text-2xl tracking-tight md:text-3xl">{booking.request.title}</h3>
      <p className="mt-3 leading-relaxed text-panel-muted">{booking.request.body}</p>
      <Button asChild variant="inverse" size="pillLg" className="mt-7 w-full sm:w-auto focus-visible:ring-offset-panel">
        <a href={booking.mailto}>{booking.request.button}</a>
      </Button>
      <p className="mt-5 text-sm text-panel-muted">
        {booking.request.orWrite}{" "}
        <a
          href={CONTACT_MAILTO}
          className="break-words text-panel-foreground underline decoration-panel-border underline-offset-4 hover:decoration-panel-ink"
        >
          {CONTACT_EMAIL}
        </a>
      </p>
    </div>
  );
}
