import { describe, expect, it } from "vitest";
import { SOCIAL_LINKS, changelogPage, footer, sources } from "@/content/landing";

describe("footer, pages and sources", () => {
  it("footer links go to /privacy, /terms and /changelog (no '#')", () => {
    expect(footer.links.map((l) => l.to)).toEqual(["/privacy", "/terms", "/changelog"]);
  });

  it("sources bar lists the 13 platforms", () => {
    expect(sources.items.map((s) => s.name)).toEqual([
      "Greenhouse", "Ashby", "Lever", "Gem", "Workable", "Himalayas", "BuiltIn",
      "Remote Rocketship", "Jobicy", "Remotive", "RemoteOK", "We Work Remotely", "Working Nomads",
    ]);
  });

  it("changelog has the 5 entries, newest first", () => {
    const dates = changelogPage.entries.map((e) => e.date);
    expect(dates).toEqual(["2026-11-13", "2026-11-12", "2026-11-12", "2026-11-12", "2026-11-11"]);
  });

  it("social links point to the given profiles", () => {
    expect(SOCIAL_LINKS.map((s) => s.href)).toEqual([
      "https://www.linkedin.com/in/qaveemsaeed",
      "https://github.com/qaveemsaeed",
      "https://www.instagram.com/qaveem_saeed/",
    ]);
  });
});
