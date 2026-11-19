import { createFileRoute } from "@tanstack/react-router";
import { legalUpdated, termsPage as p } from "@/content/landing";
import { PageShell, Prose, pageHead } from "@/components/landing/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => pageHead(p.metaTitle, p.description, "/terms"),
  component: Terms,
});

function Terms() {
  return (
    <PageShell title={p.title} meta={`Last updated ${legalUpdated}`}>
      <Prose sections={p.sections} />
    </PageShell>
  );
}
