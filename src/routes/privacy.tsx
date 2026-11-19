import { createFileRoute } from "@tanstack/react-router";
import { CONTACT_EMAIL, CONTACT_MAILTO, legalUpdated, privacyPage as p } from "@/content/landing";
import { PageShell, Prose, pageHead } from "@/components/landing/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => pageHead(p.metaTitle, p.description, "/privacy"),
  component: Privacy,
});

function Privacy() {
  return (
    <PageShell title={p.title} meta={`Last updated ${legalUpdated}`}>
      <Prose sections={p.sections} />
      <p className="mt-8 leading-relaxed text-muted-foreground">
        Questions? Email <a href={CONTACT_MAILTO} className="break-words text-foreground underline underline-offset-4">{CONTACT_EMAIL}</a>.
      </p>
    </PageShell>
  );
}
