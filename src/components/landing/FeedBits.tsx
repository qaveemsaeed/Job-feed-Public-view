import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { getVerdict, VERDICT_LABEL, type Verdict } from "@/lib/verdict";

const chipStyles: Record<Verdict, string> = {
  strong: "bg-chip-strong text-chip-strong-foreground",
  lean: "bg-chip-lean text-chip-lean-foreground",
  skip: "bg-chip-skip text-chip-skip-foreground",
};

export function ScoreChip({ score, showLabel = false }: { score: number; showLabel?: boolean }) {
  const verdict = getVerdict(score);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[3px] px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
        chipStyles[verdict],
      )}
    >
      <span className="tabular text-sm">{score}</span>
      {showLabel ? (
        <span className="font-medium">{VERDICT_LABEL[verdict]}</span>
      ) : (
        <span className="sr-only">, {VERDICT_LABEL[verdict]}</span>
      )}
    </span>
  );
}

export function ResumeTag({ resume }: { resume: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[3px] border border-panel-border px-2.5 py-0.5 font-mono text-[0.72rem] whitespace-nowrap text-panel-muted">
      <FileText className="size-3" aria-hidden="true" />
      <span className="sr-only">Resume: </span>
      {resume}
    </span>
  );
}

export function SampleBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[3px] border border-panel-border bg-panel-raised px-2.5 py-1 text-[0.7rem] font-semibold tracking-wider text-panel-foreground uppercase">
      <span className="size-1.5 rounded-full bg-verdict-lean" aria-hidden="true" />
      {label}
    </span>
  );
}
