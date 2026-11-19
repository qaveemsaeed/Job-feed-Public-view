import { Building2, CopyX, FileQuestion, Layers2, Repeat2, SlidersHorizontal, type LucideIcon } from "lucide-react";
import { guardrails, type GuardrailIcon } from "@/content/landing";
import { SectionHeading } from "./SectionHeading";

const icons: Record<GuardrailIcon, LucideIcon> = {
  rules: SlidersHorizontal,
  size: Building2,
  dedupe: CopyX,
  cap: Layers2,
  rescore: Repeat2,
  honest: FileQuestion,
};

export function Guardrails() {
  return (
    <section id="guardrails" aria-labelledby="guardrails-title" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading id="guardrails-title" eyebrow={guardrails.eyebrow} title={guardrails.title} lead={guardrails.lead} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guardrails.items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title} className="rounded-card border border-border bg-card p-6 shadow-soft">
                <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand-ink">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
