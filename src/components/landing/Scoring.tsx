import { useState } from "react";
import { scoring } from "@/content/landing";
import { cn } from "@/lib/utils";
import { BORDERLINE_RANGE, LEAN_SEND_MIN, STRONG_SEND_MIN } from "@/lib/verdict";
import { SectionHeading } from "./SectionHeading";

const segmentColors = ["bg-rubric-1", "bg-rubric-2", "bg-rubric-3", "bg-rubric-4", "bg-rubric-5", "bg-rubric-6"];
const verdictDot = { strong: "bg-verdict-strong", lean: "bg-verdict-lean", skip: "bg-verdict-skip" } as const;

/** Position on a 50–100 scale, as a percentage */
const SCALE_MIN = 50;
const pos = (n: number) => `${((n - SCALE_MIN) / (100 - SCALE_MIN)) * 100}%`;

export function Scoring() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = scoring.rubric[activeIndex]!;

  return (
    <section id="scoring" aria-labelledby="scoring-title" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading id="scoring-title" eyebrow={scoring.eyebrow} title={scoring.title} lead={scoring.lead} />

        <div className="mt-12 rounded-panel bg-panel p-5 text-panel-foreground shadow-panel sm:p-8 md:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-2xl tracking-tight">{scoring.rubricLabel}</h3>
            <p className="text-sm text-panel-muted">{scoring.rubricHint}</p>
          </div>

          <div
            role="group"
            aria-label="Rubric groups"
            className="mt-6 flex h-16 w-full gap-1 sm:h-20"
          >
            {scoring.rubric.map((group, i) => (
              <button
                key={group.key}
                type="button"
                aria-pressed={i === activeIndex}
                aria-controls="rubric-detail"
                aria-label={`${group.label}, ${group.points} points`}
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
                style={{ flexBasis: `${group.points}%` }}
                className={cn(
                  "group relative flex min-w-0 grow-0 shrink cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg p-1 text-center sm:items-start sm:justify-between sm:p-3 sm:text-left text-panel transition-[transform,box-shadow] duration-200 first:rounded-l-2xl last:rounded-r-2xl",
                  segmentColors[i],
                  i === activeIndex
                    ? "-translate-y-1 shadow-[0_0_0_2px_var(--panel),0_0_0_4px_var(--panel-foreground)]"
                    : "hover:-translate-y-0.5",
                )}
              >
                <span className="tabular font-display text-sm leading-none font-medium sm:text-2xl">
                  {group.points}
                </span>
                <span className="hidden truncate text-xs font-semibold sm:block">{group.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1.3fr] md:items-start">
            <ul className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm min-[440px]:grid-cols-2 sm:grid-cols-3">
              {scoring.rubric.map((group, i) => (
                <li key={group.key} className="flex items-center gap-2">
                  <span aria-hidden="true" className={cn("size-2.5 shrink-0 rounded-sm", segmentColors[i])} />
                  <span className={cn(i === activeIndex ? "text-panel-foreground" : "text-panel-muted")}>
                    {group.label}
                  </span>
                  <span className="tabular ml-auto text-panel-muted sm:ml-0">{group.points}</span>
                </li>
              ))}
            </ul>
            <div
              id="rubric-detail"
              aria-live="polite"
              className="min-h-[6.5rem] rounded-card border border-panel-border bg-panel-raised p-5"
            >
              <p className="flex items-baseline justify-between gap-3">
                <span className="font-display text-xl">{active.label}</span>
                <span className="tabular text-sm text-panel-ink">{active.points} / 100 pts</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-panel-muted">{active.description}</p>
            </div>
          </div>
        </div>

        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {scoring.verdicts.map((v) => (
            <li key={v.key} className="rounded-card border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center gap-2.5">
                <span aria-hidden="true" className={cn("size-2.5 rounded-full", verdictDot[v.key])} />
                <h3 className="font-sans text-sm font-semibold">{v.label}</h3>
              </div>
              <p className="tabular mt-4 font-display text-5xl font-medium tracking-tight">{v.range}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-4 grid gap-6 rounded-card border border-dashed border-border p-6 md:grid-cols-[1fr_1.2fr] md:items-center md:p-8">
          <div>
            <h3 className="text-2xl tracking-tight">{scoring.borderline.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{scoring.borderline.body}</p>
          </div>
          <figure aria-label={`Score scale from ${SCALE_MIN} to 100 with the ${BORDERLINE_RANGE.min} to ${BORDERLINE_RANGE.max} re-score band`}>
            <div aria-hidden="true" className="relative h-24">
              <div className="absolute top-10 right-0 left-0 h-2 overflow-hidden rounded-full bg-secondary">
                <div className="absolute inset-y-0 bg-verdict-skip/50" style={{ left: 0, width: pos(LEAN_SEND_MIN) }} />
                <div
                  className="absolute inset-y-0 bg-verdict-lean/60"
                  style={{ left: pos(LEAN_SEND_MIN), width: `calc(${pos(STRONG_SEND_MIN)} - ${pos(LEAN_SEND_MIN)})` }}
                />
                <div className="absolute inset-y-0 right-0 bg-verdict-strong/70" style={{ left: pos(STRONG_SEND_MIN) }} />
              </div>
              <div
                className="absolute top-6 h-10 rounded-lg border-2 border-foreground/70 bg-foreground/5"
                style={{
                  left: pos(BORDERLINE_RANGE.min),
                  width: `calc(${pos(BORDERLINE_RANGE.max)} - ${pos(BORDERLINE_RANGE.min)})`,
                }}
              />
              <span
                className="absolute top-0 -translate-x-1/2 text-xs font-medium whitespace-nowrap text-foreground"
                style={{ left: pos((BORDERLINE_RANGE.min + BORDERLINE_RANGE.max) / 2) }}
              >
                {scoring.borderline.scaleLabel}
              </span>
              {[SCALE_MIN, BORDERLINE_RANGE.min, LEAN_SEND_MIN, BORDERLINE_RANGE.max, STRONG_SEND_MIN, 100].map((n) => (
                <span
                  key={n}
                  className={cn(
                    "tabular absolute top-[4.25rem] -translate-x-1/2 text-xs text-muted-foreground",
                    // 70 sits between 67 and 73; hide it on narrow screens so the labels don't collide.
                    n === LEAN_SEND_MIN && "hidden sm:block",
                  )}
                  style={{ left: pos(n) }}
                >
                  {n}
                </span>
              ))}
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
