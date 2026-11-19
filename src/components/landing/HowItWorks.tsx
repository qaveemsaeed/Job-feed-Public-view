import { howItWorks, type StepTag } from "@/content/landing";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

function Tag({ tag }: { tag: StepTag }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[2px] px-1.5 py-px font-mono text-[0.68rem] uppercase",
        tag === "AI step" ? "bg-brand-soft text-brand-ink" : "border border-border text-muted-foreground",
      )}
    >
      {tag}
    </span>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-20 border-t border-border py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="how-title" eyebrow={howItWorks.eyebrow} title={howItWorks.title} lead={howItWorks.lead} />
          <dl className="mt-8 flex flex-col gap-3 text-sm text-muted-foreground">
            {(Object.keys(howItWorks.legend) as StepTag[]).map((tag) => (
              <div key={tag} className="flex items-center gap-2.5">
                <dt><Tag tag={tag} /></dt>
                <dd>{howItWorks.legend[tag]}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ol className="relative lg:col-span-7 lg:col-start-6">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[7.5rem] w-px bg-foreground max-sm:left-[0.3rem]" />
          {howItWorks.steps.map((step, i) => (
            <li key={step.title} className="relative grid gap-1 pb-10 last:pb-0 sm:grid-cols-[7.5rem_1fr] max-sm:pl-7">
              <span className="font-mono text-xs text-muted-foreground uppercase sm:pt-1.5 sm:pr-6">{step.time}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-2 size-2.5 -translate-x-1/2 border border-foreground left-[7.5rem] max-sm:left-[0.3rem]",
                  step.tag === "AI step" ? "bg-brand border-brand" : "bg-background",
                )}
              />
              <div className="sm:pl-8">
                <h3 className="flex flex-wrap items-baseline gap-3 text-2xl font-medium">
                  <span className="font-mono text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  {step.title}
                </h3>
                <p className="mt-2 max-w-lg leading-relaxed text-muted-foreground">{step.description}</p>
                <div className="mt-3"><Tag tag={step.tag} /></div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
