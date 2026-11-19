import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { hero, sampleRows } from "@/content/landing";
import { getVerdict, VERDICT_LABEL } from "@/lib/verdict";
import { cn } from "@/lib/utils";
import { SourcesBar } from "./SourcesBar";

const heroRows = [...sampleRows].sort((a, b) => b.score - a.score).slice(0, 6);
const rowDelay = (i: number) => ({ animationDelay: `${300 + i * 90}ms` });

/** Today's date in the visitor's browser, YYYY-MM-DD. Placeholder width avoids layout shift before hydration. */
function useToday() {
  const [today, setToday] = useState("····-··-··");
  useEffect(() => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    setToday(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`);
  }, []);
  return today;
}

function VerdictScore({ score }: { score: number }) {
  const v = getVerdict(score);
  return (
    <span className="inline-flex items-center justify-end gap-2">
      <span className="tabular font-mono text-sm font-medium">{score}</span>
      <span
        className={cn(
          "rounded-[2px] px-1.5 py-px font-mono text-[0.65rem] whitespace-nowrap uppercase",
          v === "strong" ? "bg-chip-strong text-chip-strong-foreground" : "bg-chip-lean text-chip-lean-foreground",
        )}
      >
        {VERDICT_LABEL[v]}
      </span>
    </span>
  );
}

export function Hero() {
  const today = useToday();
  return (
    <section id="top" aria-labelledby="hero-title" className="pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="eyebrow">01 / {hero.eyebrow}</p>
          <h1
            id="hero-title"
            className="mt-5 text-[2.6rem] leading-[0.98] font-medium text-balance text-foreground sm:text-6xl lg:text-[4.1rem]"
          >
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">{hero.subhead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="brand" size="pillLg">
              <a href={hero.primary.href}>{hero.primary.label}</a>
            </Button>
            <Button asChild variant="quiet" size="pillLg">
              <a href={hero.secondary.href}>{hero.secondary.label}</a>
            </Button>
          </div>
          <p className="mt-4 font-mono text-xs text-muted-foreground">{hero.footnote}</p>
          <SourcesBar />
        </div>

        <figure className="min-w-0 lg:col-span-7">
          <div className="border border-foreground bg-card">
            <div className="flex items-center justify-between gap-3 border-b border-foreground bg-foreground px-4 py-2.5 font-mono text-xs text-background">
              <span>
                feed / <span className="tabular">{today}</span>.md
              </span>
              <span className="opacity-75">{hero.panel.sortedBy}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[34rem] text-left font-mono text-[0.8rem]">
                <caption className="sr-only">{hero.panel.tableCaption}</caption>
                <thead>
                  <tr className="border-b border-foreground text-[0.68rem] text-muted-foreground uppercase">
                    <th scope="col" className="px-4 py-2 font-medium">Role</th>
                    <th scope="col" className="px-2 py-2 font-medium">Source</th>
                    <th scope="col" className="px-2 py-2 font-medium">Resume</th>
                    <th scope="col" className="px-2 py-2 text-right font-medium">Size</th>
                    <th scope="col" className="px-4 py-2 text-right font-medium">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {heroRows.map((row, i) => (
                    <tr key={row.id} className="animate-row-in border-b border-border last:border-b-0" style={rowDelay(i)}>
                      <td className="px-4 py-3">
                        <div className="font-sans font-medium text-foreground">{row.company}</div>
                        <div className="text-muted-foreground">{row.title}</div>
                      </td>
                      <td className="px-2 py-3 text-muted-foreground">{row.source}</td>
                      <td className="px-2 py-3 whitespace-nowrap">{row.resume}</td>
                      <td className="tabular px-2 py-3 text-right text-muted-foreground">{row.size}</td>
                      <td className="px-4 py-3 text-right"><VerdictScore score={row.score} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <figcaption className="mt-3 font-mono text-xs text-muted-foreground">{hero.panel.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
