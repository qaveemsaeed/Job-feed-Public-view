import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/content/landing";
import { SiteNav } from "@/components/landing/SiteNav";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Scoring } from "@/components/landing/Scoring";
import { SampleFeed } from "@/components/landing/SampleFeed";
import { Guardrails } from "@/components/landing/Guardrails";
import { MakeItYours } from "@/components/landing/MakeItYours";
import { Booking } from "@/components/landing/Booking";
import { Faq } from "@/components/landing/Faq";
import { FinalCta } from "@/components/landing/FinalCta";
import { SiteFooter } from "@/components/landing/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: site.title },
      { name: "description", content: site.description },
      { property: "og:title", content: site.title },
      { property: "og:description", content: site.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: site.title },
      { name: "twitter:description", content: site.description },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main">
        <Hero />
        <Stats />
        <HowItWorks />
        <Scoring />
        <SampleFeed />
        <Guardrails />
        <MakeItYours />
        <Booking />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
