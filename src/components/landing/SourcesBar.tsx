import { sources } from "@/content/landing";

function Item({ name, domain }: { name: string; domain: string }) {
  return (
    <span className="group inline-flex h-6 shrink-0 items-center gap-2 font-mono text-[0.8rem] whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground">
      <img
        src={`/sources/${domain}.png`}
        alt=""
        width={18}
        height={18}
        loading="lazy"
        className="size-[18px] rounded-[2px] opacity-70 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
      />
      {name}
    </span>
  );
}

/** One accessible list; a duplicated, aria-hidden copy makes the marquee loop seamlessly. */
export function SourcesBar() {
  return (
    <div className="mt-10 border-t border-border pt-5">
      <p id="sources-label" className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
        {sources.label}
      </p>
      <div className="marquee group/m relative mt-3 overflow-hidden">
        <div className="marquee-track flex w-max gap-7">
          <ul aria-labelledby="sources-label" className="flex gap-7">
            {sources.items.map((s) => (
              <li key={s.name}>
                <Item {...s} />
              </li>
            ))}
          </ul>
          <ul aria-hidden="true" className="flex gap-7">
            {sources.items.map((s) => (
              <li key={s.name}>
                <Item {...s} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{sources.disclaimer}</p>
    </div>
  );
}
