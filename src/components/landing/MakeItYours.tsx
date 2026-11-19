import { makeItYours } from "@/content/landing";

export function MakeItYours() {
  return (
    <section aria-labelledby="yours-title" className="py-20 md:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">{makeItYours.eyebrow}</p>
          <h2 id="yours-title" className="mt-3 text-4xl leading-[1.05] font-normal tracking-tight text-balance md:text-5xl">
            {makeItYours.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">{makeItYours.body}</p>

          <div className="mt-8 rounded-panel bg-panel p-5 font-mono text-xs text-panel-foreground shadow-panel sm:text-sm">
            <p className="text-panel-muted">{`# ${makeItYours.snippetLabel}`}</p>
            <dl className="mt-3 space-y-1.5">
              {makeItYours.snippet.map((line) => (
                <div key={line.key} className="flex flex-wrap gap-x-2">
                  <dt className="text-panel-ink">{line.key}:</dt>
                  <dd className="break-words text-panel-foreground">{line.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <ol className="flex flex-col gap-4 self-center">
          {makeItYours.items.map((item, i) => (
            <li key={item.title} className="flex gap-5 rounded-card border border-border bg-card p-6 shadow-soft">
              <span aria-hidden="true" className="tabular font-display text-3xl leading-none font-medium text-brand-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-xl tracking-tight">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
