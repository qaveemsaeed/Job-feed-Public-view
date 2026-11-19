import { useMemo, useState } from "react";
import { ArrowDownWideNarrow, ArrowUpNarrowWide, ArrowUpRight } from "lucide-react";
import { sampleFeed, sampleRows, type SampleRow } from "@/content/landing";
import { cn } from "@/lib/utils";
import { getVerdict, isBorderline } from "@/lib/verdict";
import { ResumeTag, SampleBadge, ScoreChip } from "./FeedBits";
import { SectionHeading } from "./SectionHeading";

type FilterKey = (typeof sampleFeed.filters)[number]["key"];
type SortDir = "desc" | "asc";

function RowLinks({ row }: { row: SampleRow }) {
  return (
    <div className="flex items-center gap-2">
      <a
        href="#"
        className="inline-flex items-center gap-1 rounded-[3px] bg-panel-foreground px-3 py-1 text-xs font-semibold text-panel hover:bg-panel-foreground/90"
        aria-label={`${sampleFeed.apply}: ${row.title} at ${row.company} (sample link)`}
      >
        {sampleFeed.apply}
        <ArrowUpRight className="size-3" aria-hidden="true" />
      </a>
      <a
        href="#"
        className="inline-flex items-center rounded-[3px] border border-panel-border px-3 py-1 text-xs text-panel-foreground hover:bg-panel-raised"
        aria-label={`${row.company} company page (sample link)`}
      >
        {sampleFeed.companyPage}
      </a>
    </div>
  );
}

function Score({ row }: { row: SampleRow }) {
  return (
    <span className="inline-flex flex-col items-end gap-1">
      <ScoreChip score={row.score} showLabel />
      {isBorderline(row.score) && (
        <span className="font-mono text-[0.65rem] text-panel-muted">{sampleFeed.rescoredMark}</span>
      )}
    </span>
  );
}

export function SampleFeed() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const counts = useMemo(
    () => ({
      all: sampleRows.length,
      strong: sampleRows.filter((r) => getVerdict(r.score) === "strong").length,
      lean: sampleRows.filter((r) => getVerdict(r.score) === "lean").length,
    }),
    [],
  );

  const rows = useMemo(
    () =>
      sampleRows
        .filter((r) => filter === "all" || getVerdict(r.score) === filter)
        .sort((a, b) => (sortDir === "desc" ? b.score - a.score : a.score - b.score)),
    [filter, sortDir],
  );

  const toggleSort = () => setSortDir((d) => (d === "desc" ? "asc" : "desc"));
  const SortIcon = sortDir === "desc" ? ArrowDownWideNarrow : ArrowUpNarrowWide;
  const c = sampleFeed.columns;

  return (
    <section id="sample-feed" aria-labelledby="feed-title" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading id="feed-title" eyebrow={sampleFeed.eyebrow} title={sampleFeed.title} lead={sampleFeed.lead} />

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <div role="group" aria-label={sampleFeed.filterLabel} className="flex flex-wrap gap-2">
            {sampleFeed.filters.map((f) => (
              <button
                key={f.key}
                type="button"
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
                className={cn(
                  "inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-[3px] border px-4 text-sm font-medium transition-colors",
                  filter === f.key
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-foreground hover:border-foreground/30",
                )}
              >
                {f.label}
                <span
                  className={cn(
                    "tabular rounded-[3px] px-1.5 text-xs",
                    filter === f.key ? "bg-background/20" : "bg-secondary text-muted-foreground",
                  )}
                >
                  {counts[f.key]}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={toggleSort}
            className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-[3px] border border-border bg-card px-4 text-sm font-medium text-foreground hover:border-foreground/30"
          >
            <SortIcon className="size-4" aria-hidden="true" />
            {sampleFeed.sortLabel[sortDir]}
          </button>
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {rows.length} of {sampleRows.length} sample roles, {sampleFeed.sortLabel[sortDir].toLowerCase()}.
        </p>

        <figure className="mt-5 xl:-mx-8">
          <div className="overflow-hidden rounded-panel bg-panel text-panel-foreground shadow-panel">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-panel-border px-5 py-4">
              <span className="font-mono text-xs text-panel-muted">feed / 2026-03-04</span>
              <SampleBadge label={sampleFeed.badge} />
            </div>

            {/* Table for md+ */}
            <div
              className="relative hidden overflow-x-auto md:block"
              tabIndex={0}
              role="region"
              aria-label="Sample feed table, scrolls horizontally"
            >
              <table className="w-full min-w-[64rem] text-left text-sm">
                <caption className="sr-only">Sample daily feed with fictional roles</caption>
                <thead>
                  <tr className="text-[0.7rem] tracking-wider text-panel-muted uppercase">
                    <th scope="col" className="py-3 pr-3 pl-5 font-medium">
                      {c.date}
                      <span aria-hidden="true"> / </span>
                      <span className="sr-only"> and </span>
                      {c.source}
                    </th>
                    <th scope="col" className="px-3 py-3 font-medium">{c.company}</th>
                    <th scope="col" className="px-3 py-3 font-medium">{c.title}</th>
                    <th scope="col" className="px-3 py-3 font-medium">{c.salary}</th>
                    <th scope="col" className="px-3 py-3 font-medium">{c.resume}</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">{c.size}</th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-right font-medium"
                      aria-sort={sortDir === "desc" ? "descending" : "ascending"}
                    >
                      <button
                        type="button"
                        onClick={toggleSort}
                        className="inline-flex cursor-pointer items-center gap-1 rounded uppercase hover:text-panel-foreground"
                      >
                        {c.score}
                        <SortIcon className="size-3.5" aria-hidden="true" />
                        <span className="sr-only">, change sort order</span>
                      </button>
                    </th>
                    <th scope="col" className="py-3 pr-5 pl-3 font-medium">{c.links}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id} className="border-t border-panel-border align-middle hover:bg-panel-raised">
                      <td className="py-3.5 pr-3 pl-5 whitespace-nowrap text-panel-muted">
                        <span className="tabular block">{row.date}</span>
                        <span className="block text-xs">{row.source}</span>
                      </td>
                      <td className="px-3 py-3.5 font-medium whitespace-nowrap">{row.company}</td>
                      <td className="min-w-[12rem] px-3 py-3.5 text-pretty">{row.title}</td>
                      <td className="tabular px-3 py-3.5 whitespace-nowrap text-panel-muted">{row.salary}</td>
                      <td className="px-3 py-3.5"><ResumeTag resume={row.resume} /></td>
                      <td className="tabular px-3 py-3.5 text-right text-panel-muted">{row.size}</td>
                      <td className="px-3 py-3.5 text-right"><Score row={row} /></td>
                      <td className="py-3.5 pr-5 pl-3 whitespace-nowrap"><RowLinks row={row} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards for small screens */}
            <ul className="md:hidden" aria-label="Sample feed roles">
              {rows.map((row) => (
                <li key={row.id} className="border-t border-panel-border px-5 py-5 first:border-t-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium">{row.company}</p>
                      <p className="text-sm text-panel-muted">{row.title}</p>
                    </div>
                    <Score row={row} />
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    {(
                      [
                        [c.date, row.date],
                        [c.source, row.source],
                        [c.salary, row.salary],
                        [c.size, row.size],
                      ] as const
                    ).map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-panel-muted">{k}</dt>
                        <dd className="tabular mt-0.5 text-panel-foreground">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <ResumeTag resume={row.resume} />
                    <RowLinks row={row} />
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-panel-border bg-panel-raised px-5 py-4 text-sm leading-relaxed text-panel-muted">
              <p>{sampleFeed.shortfall}</p>
              <p className="mt-1 font-mono text-xs">{sampleFeed.rescoredNote}</p>
            </div>
          </div>
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">{sampleFeed.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
