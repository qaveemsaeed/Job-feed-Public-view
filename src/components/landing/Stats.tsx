import { stats, type Stat } from "@/content/landing";
import { useCountUp } from "@/hooks/use-count-up";

function format(stat: Stat, progress: number) {
  const a = Math.round(stat.value * progress);
  const main = stat.valueTo !== undefined ? `${a}–${Math.round(stat.valueTo * progress)}` : `${a}`;
  return `${stat.prefix ?? ""}${main}${stat.suffix ?? ""}`;
}

function StatItem({ stat }: { stat: Stat }) {
  const { ref, progress } = useCountUp<HTMLDivElement>();
  const final = format(stat, 1);
  return (
    <div ref={ref} className="flex flex-col gap-2 border-t border-border pt-5">
      <dt className="order-2 text-sm leading-snug text-muted-foreground">{stat.label}</dt>
      <dd className="order-1 font-display text-5xl font-medium tracking-tight text-foreground md:text-6xl">
        <span className="sr-only">{final}</span>
        {/* Invisible final value reserves width so counting causes no layout shift */}
        <span aria-hidden="true" className="tabular grid">
          <span className="invisible col-start-1 row-start-1">{final}</span>
          <span className="col-start-1 row-start-1">{format(stat, progress)}</span>
        </span>
      </dd>
    </div>
  );
}

export function Stats() {
  return (
    <section aria-label="Daybreak by the numbers" className="py-16 md:py-20">
      <dl className="container-page grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} />
        ))}
      </dl>
    </section>
  );
}
