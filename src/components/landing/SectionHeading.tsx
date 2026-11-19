import { cn } from "@/lib/utils";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, lead, align = "left", className }: Props) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2
        id={id}
        className="mt-3 text-4xl leading-[1.05] font-normal tracking-tight text-balance text-foreground md:text-5xl"
      >
        {title}
      </h2>
      {lead && <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">{lead}</p>}
    </div>
  );
}
