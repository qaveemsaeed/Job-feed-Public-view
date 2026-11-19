export type Verdict = "strong" | "lean" | "skip";

/** Score at or above which a job is a Strong send. */
export const STRONG_SEND_MIN = 85;
/** Score at or above which a job is a Lean send (below Strong). */
export const LEAN_SEND_MIN = 70;
/** Scores in this inclusive range are scored twice and averaged. */
export const BORDERLINE_RANGE = { min: 67, max: 73 } as const;

export const VERDICT_LABEL: Record<Verdict, string> = {
  strong: "Strong send",
  lean: "Lean send",
  skip: "Skip",
};

export function getVerdict(score: number, hasHardBlocker = false): Verdict {
  if (hasHardBlocker) return "skip";
  if (score >= STRONG_SEND_MIN) return "strong";
  if (score >= LEAN_SEND_MIN) return "lean";
  return "skip";
}

export function isBorderline(score: number): boolean {
  return score >= BORDERLINE_RANGE.min && score <= BORDERLINE_RANGE.max;
}
