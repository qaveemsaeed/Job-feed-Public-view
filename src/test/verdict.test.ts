import { describe, expect, it } from "vitest";
import { getVerdict, isBorderline } from "@/lib/verdict";
import { sampleRows, scoring } from "@/content/landing";

describe("verdict rules", () => {
  it("85 and above is a Strong send", () => {
    expect(getVerdict(85)).toBe("strong");
    expect(getVerdict(100)).toBe("strong");
  });
  it("70 to 84 is a Lean send", () => {
    expect(getVerdict(70)).toBe("lean");
    expect(getVerdict(84)).toBe("lean");
  });
  it("below 70 is Skip", () => {
    expect(getVerdict(69)).toBe("skip");
  });
  it("any hard blocker is Skip regardless of score", () => {
    expect(getVerdict(95, true)).toBe("skip");
  });
  it("67 to 73 is the borderline re-score band", () => {
    expect(isBorderline(66)).toBe(false);
    expect(isBorderline(67)).toBe(true);
    expect(isBorderline(73)).toBe(true);
    expect(isBorderline(74)).toBe(false);
  });
});

describe("rubric and sample feed", () => {
  it("rubric weights are Stack 30, Years 10, Responsibilities 25, Domain 15, Preferred 10, Logistics 10", () => {
    expect(Object.fromEntries(scoring.rubric.map((g) => [g.label, g.points]))).toEqual({
      Stack: 30, Years: 10, Responsibilities: 25, Domain: 15, Preferred: 10, Logistics: 10,
    });
  });
  it("sample feed never lists more than 2 roles per company", () => {
    const perCompany = new Map<string, number>();
    for (const r of sampleRows) perCompany.set(r.company, (perCompany.get(r.company) ?? 0) + 1);
    expect(Math.max(...perCompany.values())).toBeLessThanOrEqual(2);
  });
  it("sample feed contains no Skip rows", () => {
    expect(sampleRows.some((r) => getVerdict(r.score) === "skip")).toBe(false);
  });
});
