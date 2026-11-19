import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

export function PageShell({ title, meta, children }: { title: string; meta?: string; children: ReactNode }) {
  return (
    <>
      <SiteNav />
      <main id="main" className="container-page py-16 md:py-24">
        <article className="max-w-[70ch]">
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" aria-hidden="true" /> Back to home
          </Link>
          <h1 className="mt-8 text-5xl font-medium md:text-6xl">{title}</h1>
          {meta && <p className="mt-4 font-mono text-xs text-muted-foreground">{meta}</p>}
          <div className="mt-10 border-t border-foreground pt-8">{children}</div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}

export function Prose({ sections }: { sections: { h: string; p: string }[] }) {
  return (
    <div className="space-y-8">
      {sections.map((s) => (
        <section key={s.h}>
          <h2 className="text-xl font-medium">{s.h}</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">{s.p}</p>
        </section>
      ))}
    </div>
  );
}

export const pageHead = (title: string, description: string, path: string) => ({
  meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ],
  links: [{ rel: "canonical", href: path }],
});
