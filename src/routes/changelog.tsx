import { createFileRoute } from "@tanstack/react-router";
import { changelogPage as p } from "@/content/landing";
import { PageShell, pageHead } from "@/components/landing/PageShell";

export const Route = createFileRoute("/changelog")({
  head: () => pageHead(p.metaTitle, p.description, "/changelog"),
  component: Changelog,
});

function Changelog() {
  return (
    <PageShell title={p.title} meta="Newest first">
      <ol className="divide-y divide-border">
        {p.entries.map((e, i) => (
          <li key={i} className="grid gap-2 py-5 first:pt-0 sm:grid-cols-[8rem_1fr]">
            <time dateTime={e.date} className="tabular font-mono text-sm text-muted-foreground">{e.date}</time>
            <p className="leading-relaxed">{e.text}</p>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
