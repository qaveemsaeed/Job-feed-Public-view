/**
 * All Daybreak landing page copy lives here. Keep product copy generic: no resumes,
 * locations or real companies. Sample rows use fictional company names.
 */
import { buildMailto, type MailtoHref } from "@/lib/mailto";

export type AnchorHref = `#${string}`;
export type LinkHref = AnchorHref | MailtoHref;
export type Cta = { label: string; href: AnchorHref };

/** The one place to change the contact address. Used by the nav, booking section, final CTA and footer. */
export const CONTACT_EMAIL = "qaveem.saeed@cloudpacer.com";
export const CONTACT_MAILTO: MailtoHref = buildMailto(CONTACT_EMAIL);

/**
 * Paste a scheduling link here to turn on the embedded scheduler in the "Book a call"
 * section. Works with Calendly, Cal.com or a Google Calendar appointment schedule page
 * (for Google, use the link from its "Website embed" code, which ends in `?gv=true`).
 * Leave it empty to show the "Request a 30-minute call" email card instead.
 */
export const BOOKING_URL: string =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2JJnJ-Zx0HOKmk2-iYkoCLLqy747Y56p0ZP925R0BlCHlc80Zxy6yo2wxf6QlQp6-QDASyWSi8?gv=true";

/** Public booking page used by the "Open booking page" fallback button. */
export const BOOKING_PAGE_URL = "https://calendar.app.google/TyPTegBXqYcpaWxK8";

/** Social profiles shown as icon links in the footer. */
export const SOCIAL_LINKS = [
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/qaveemsaeed" },
  { key: "github", label: "GitHub", href: "https://github.com/qaveemsaeed" },
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/qaveem_saeed/" },
] as const;

export const site = {
  name: "Daybreak",
  tagline: "Jobs that already fit, before your day starts.",
  title: "Daybreak — Wake up to jobs that already fit",
  description:
    "A nightly AI pipeline that collects fresh remote engineering jobs, picks the best-fitting resume for each, scores it on a 100-point rubric and publishes one ranked table by morning.",
} as const;

export const nav: { links: { label: string; href: LinkHref }[]; cta: Cta } = {
  links: [
    { label: "How it works", href: "#how-it-works" },
    { label: "Scoring", href: "#scoring" },
    { label: "Guardrails", href: "#guardrails" },
    { label: "FAQ", href: "#faq" },
    { label: "Book a call", href: "#book" },
    { label: "Contact", href: CONTACT_MAILTO },
  ],
  cta: { label: "Book a 30-min call", href: "#book" },
};

export const hero = {
  eyebrow: site.tagline,
  headline: "Wake up to jobs that already fit.",
  subhead:
    "Every night a scheduled run collects the last 24 hours of remote engineering postings, drops what doesn't fit, scores the rest and writes one dated table.",
  primary: { label: "See a sample feed", href: "#sample-feed" } satisfies Cta,
  secondary: { label: "How it works", href: "#how-it-works" } satisfies Cta,
  footnote: "Runs on your existing AI subscription. No API key, no per-job fees.",
  panel: {
    fileName: "feed / 2026-03-04",
    badge: "Sample data",
    sortedBy: "Sorted by score",
    caption:
      "Sample data. Companies, roles and salaries are fictional and shown for illustration only.",
    tableCaption: "Sample daily feed: six fictional roles sorted by score",
  },
};

export type Source = { name: string; domain: string };

export const sources = {
  label: "Searches and connects to",
  listLabel: "Job platforms Daybreak searches",
  items: [
    { name: "Greenhouse", domain: "greenhouse.io" },
    { name: "Ashby", domain: "ashbyhq.com" },
    { name: "Lever", domain: "lever.co" },
    { name: "Gem", domain: "gem.com" },
    { name: "Workable", domain: "workable.com" },
    { name: "Himalayas", domain: "himalayas.app" },
    { name: "BuiltIn", domain: "builtin.com" },
    { name: "Remote Rocketship", domain: "remoterocketship.com" },
    { name: "Jobicy", domain: "jobicy.com" },
    { name: "Remotive", domain: "remotive.com" },
    { name: "RemoteOK", domain: "remoteok.com" },
    { name: "We Work Remotely", domain: "weworkremotely.com" },
    { name: "Working Nomads", domain: "workingnomads.com" },
  ] satisfies Source[],
  disclaimer:
    "Logos belong to their respective owners. Daybreak is not affiliated with or endorsed by them.",
};

export type Stat = {
  prefix?: string;
  value: number;
  /** When set, the stat renders as a range: value–valueTo */
  valueTo?: number;
  suffix?: string;
  label: string;
};

export const stats: Stat[] = [
  { prefix: "~", value: 400, label: "company job boards read every night" },
  { value: 9, label: "aggregator feeds alongside them" },
  { value: 20, valueTo: 50, label: "roles a day, sorted by score" },
  { value: 0, label: "API keys or per-job fees" },
];

export type StepTag = "free script" | "AI step";
export type Step = { time: string; title: string; description: string; tag: StepTag };

export const howItWorks = {
  eyebrow: "02 / How it works",
  title: "One night, five steps.",
  lead: "Plain scripts do the cheap work. The AI only steps in where judgment matters.",
  steps: [
    {
      time: "Evening",
      title: "Discover",
      description: "Lines up about 400 company boards and 9 aggregator feeds for tonight's run.",
      tag: "free script",
    },
    {
      time: "Overnight",
      title: "Fetch and filter",
      description:
        "Pulls the last 24 hours of postings and drops anything outside your rules or already seen.",
      tag: "free script",
    },
    {
      time: "Overnight",
      title: "Size check",
      description: "Checks company headcount and skips anyone above your cap.",
      tag: "AI step",
    },
    {
      time: "Before dawn",
      title: "Score and match",
      description:
        "Picks the best-fitting resume from the library index, then scores the job against it on the 100-point rubric.",
      tag: "AI step",
    },
    {
      time: "Morning",
      title: "Publish",
      description: "Writes one dated table, sorted by score, ready when you wake up.",
      tag: "free script",
    },
  ] satisfies Step[],
  legend: {
    "free script": "Runs as a plain script. Costs nothing.",
    "AI step": "Uses your existing AI subscription.",
  } satisfies Record<StepTag, string>,
};

export type RubricGroup = { key: string; label: string; points: number; description: string };

export const scoring = {
  eyebrow: "03 / Scoring",
  title: "One fixed rubric. 100 points. No vibes.",
  lead: "Daybreak picks the best-fitting resume from the library index, then scores the job against it on the 100-point rubric. One fixed rubric, applied the same way to every job.",
  rubricLabel: "The 100-point rubric",
  rubricHint: "Hover, tap or focus a segment to see what it measures.",
  rubric: [
    {
      key: "stack",
      label: "Stack",
      points: 30,
      description:
        "How closely the required languages, frameworks and tools match what the resume shows.",
    },
    {
      key: "years",
      label: "Years",
      points: 10,
      description: "Whether the stated experience requirement lines up with the resume.",
    },
    {
      key: "responsibilities",
      label: "Responsibilities",
      points: 25,
      description: "Overlap between the day-to-day work described and the work the resume proves.",
    },
    {
      key: "domain",
      label: "Domain",
      points: 15,
      description: "Fit with the industry or product area the team works in.",
    },
    {
      key: "preferred",
      label: "Preferred",
      points: 10,
      description: "Nice-to-have skills from the posting that the resume also covers.",
    },
    {
      key: "logistics",
      label: "Logistics",
      points: 10,
      description: "Remote setup, eligibility and other practical requirements.",
    },
  ] satisfies RubricGroup[],
  verdicts: [
    {
      key: "strong",
      label: "Strong send",
      range: "85+",
      description: "The core requirements line up. Apply with the chosen resume today.",
    },
    {
      key: "lean",
      label: "Lean send",
      range: "70–84",
      description: "Worth sending. Usually a gap in preferred skills or domain, not the core.",
    },
    {
      key: "skip",
      label: "Skip",
      range: "<70",
      description: "Below 70, or any hard blocker. Left out of the feed entirely.",
    },
  ] as const,
  borderline: {
    title: "Borderline? It gets a second look.",
    body: "Scores from 67 to 73 sit right on the line, so those jobs are scored a second time and the two results are averaged. One noisy read can't push a job in or out.",
    scaleLabel: "Re-scored band",
  },
};

export type SampleRow = {
  id: string;
  date: string;
  source: string;
  company: string;
  title: string;
  salary: string;
  resume: string;
  size: string;
  score: number;
};

/** Fictional rows for illustration. At most 2 per company, no repeats. */
export const sampleRows: SampleRow[] = [
  {
    id: "r1",
    date: "2026-03-04",
    source: "Ashby",
    company: "Quillstack",
    title: "Senior Backend Engineer",
    salary: "$165k–$190k",
    resume: "Backend-Node",
    size: "85",
    score: 92,
  },
  {
    id: "r2",
    date: "2026-03-04",
    source: "Ashby",
    company: "Cobaltleaf",
    title: "Backend Engineer, APIs",
    salary: "$130k–$150k",
    resume: "Backend-Node",
    size: "35",
    score: 90,
  },
  {
    id: "r3",
    date: "2026-03-04",
    source: "Greenhouse",
    company: "Nimbusform Labs",
    title: "Platform Engineer",
    salary: "N/A",
    resume: "Platform",
    size: "140",
    score: 88,
  },
  {
    id: "r4",
    date: "2026-03-04",
    source: "Lever",
    company: "Parcelwright",
    title: "Staff Engineer, Payments",
    salary: "$180k–$210k",
    resume: "Backend-Node",
    size: "320",
    score: 86,
  },
  {
    id: "r5",
    date: "2026-03-04",
    source: "Workable",
    company: "Fernwave Systems",
    title: "Full-stack Engineer",
    salary: "Competitive",
    resume: "Fullstack-Py-JS",
    size: "60",
    score: 81,
  },
  {
    id: "r6",
    date: "2026-03-04",
    source: "Greenhouse",
    company: "Brasswork Cloud",
    title: "Site Reliability Engineer",
    salary: "N/A",
    resume: "Platform",
    size: "450",
    score: 79,
  },
  {
    id: "r7",
    date: "2026-03-04",
    source: "Aggregator",
    company: "Orbitkettle",
    title: "Data Engineer",
    salary: "$140k–$160k",
    resume: "AI-Agentic",
    size: "N/A",
    score: 77,
  },
  {
    id: "r8",
    date: "2026-03-04",
    source: "Gem",
    company: "Tidepool Analytics",
    title: "Senior Frontend Engineer",
    salary: "$150k–$175k",
    resume: "Fullstack-Py-JS",
    size: "210",
    score: 72,
  },
  {
    id: "r9",
    date: "2026-03-04",
    source: "Lever",
    company: "Lanternmoth",
    title: "ML Platform Engineer",
    salary: "$170k+ DOE",
    resume: "AI-Agentic",
    size: "180",
    score: 71,
  },
];

export const sampleFeed = {
  eyebrow: "04 / Sample feed",
  title: "A morning's feed, up close.",
  lead: "20 to 50 roles a day, sorted by score, each with the resume to use. Filter it the way you'd skim it over coffee.",
  badge: "Sample data",
  filterLabel: "Filter sample roles by verdict",
  filters: [
    { key: "all", label: "All" },
    { key: "strong", label: "Strong send" },
    { key: "lean", label: "Lean send" },
  ] as const,
  sortLabel: { desc: "Highest score first", asc: "Lowest score first" },
  columns: {
    date: "Date",
    source: "Source",
    company: "Company",
    title: "Title",
    salary: "Salary",
    resume: "Resume",
    size: "Size",
    score: "Score",
    links: "Links",
  },
  apply: "Apply",
  companyPage: "Company",
  rescoredMark: "avg ×2",
  rescoredNote: "avg ×2: borderline score, re-scored twice and averaged.",
  shortfall:
    "Only 9 roles qualified in this sample, so the feed lists 9 instead of padding to 20. Skipped tonight: 37 scored below 70, 6 hit a hard blocker, 4 were over the size cap.",
  caption: "Sample data. All companies, roles and salaries are fictional.",
};

export type GuardrailIcon = "rules" | "size" | "dedupe" | "cap" | "rescore" | "honest";
export type Guardrail = { icon: GuardrailIcon; title: string; description: string };

export const guardrails = {
  eyebrow: "05 / Guardrails",
  title: "Honest by design.",
  lead: "A shortlist is only useful if you can trust it. These rules hold every single night.",
  items: [
    {
      icon: "rules",
      title: "Your rules, enforced",
      description:
        "Remote-only and eligibility rules are configurable. Breaking one is a hard blocker, whatever the score.",
    },
    {
      icon: "size",
      title: "Headcount cap",
      description: "Companies above the size cap you set are skipped before any scoring happens.",
    },
    {
      icon: "dedupe",
      title: "Never listed twice",
      description: "A job that already appeared in an earlier feed is not listed again, even if it shows up on another platform.",
    },
    {
      icon: "cap",
      title: "Two per company, max",
      description: "At most 2 roles per company per day, so one hiring spree can't flood the list.",
    },
    {
      icon: "rescore",
      title: "Borderline re-score",
      description: "Scores from 67 to 73 are scored twice and averaged to cut noise.",
    },
    {
      icon: "honest",
      title: "Nothing invented",
      description: "If a salary, size or detail isn't stated, the cell says N/A. No guessing.",
    },
  ] satisfies Guardrail[],
};

export const makeItYours = {
  eyebrow: "06 / Make it yours",
  title: "Same pipeline. Any profile, any team.",
  body: "Daybreak doesn't care whose resumes it reads. Swap in a different resume library and rule set, and the same nightly run works for another profile or a whole team.",
  items: [
    {
      title: "Resume library",
      description:
        "Add, remove or rewrite resume variants. Each job is matched to whichever one scores highest.",
    },
    {
      title: "Remote and eligibility rules",
      description: "Decide what counts as remote and which requirements are hard blockers.",
    },
    {
      title: "Company size cap",
      description: "Set the headcount above which companies are skipped before scoring.",
    },
  ],
  snippetLabel: "Example configuration",
  snippet: [
    { key: "resumes", value: "Backend-Node, Fullstack-Py-JS, Platform, AI-Agentic" },
    { key: "remote_only", value: "true" },
    { key: "eligibility", value: "your rules here" },
    { key: "headcount_cap", value: "500" },
  ],
};

export const booking = {
  eyebrow: "07 / Book a call",
  title: "Book a 30-minute consultation",
  pitch:
    "A free 30-minute call to see how Daybreak works and how it could fit your team. No preparation needed.",
  coversLabel: "What the call covers",
  covers: [
    "A walk-through of the nightly pipeline, from discovery to the published table.",
    "How to adapt the resume library and rules to your profile or team.",
    "Cost and setup: what it runs on and what it takes to get started.",
  ],
  embed: {
    title: "Book a 30-minute consultation",
    fallbackHint: "Scheduler not loading?",
    openLabel: "Open booking page",
  },
  request: {
    title: "Request a 30-minute call",
    body: "Send a quick email with a few days and times that suit you, and we'll set up the call.",
    button: "Email to request a call",
    orWrite: "Or write directly to",
  },
  mailto: buildMailto(CONTACT_EMAIL, {
    subject: "30-minute consultation",
    body:
      "Hi,\n\nI'd like to book a free 30-minute Daybreak consultation.\n\nPreferred days:\nPreferred times (with time zone):\n\nThanks!",
  }),
};

export const faq = {
  eyebrow: "08 / FAQ",
  title: "Questions, answered plainly.",
  items: [
    {
      q: "What does it cost to run?",
      a: "It runs on an AI subscription you already have. There's no API key to set up and no per-job fee, so a busy night costs the same as a quiet one.",
    },
    {
      q: "Where do the jobs come from?",
      a: "Public job-board APIs and feeds: about 400 company boards on Ashby, Greenhouse, Lever, Gem and Workable, plus 9 aggregator feeds. Only postings from the last 24 hours are collected.",
    },
    {
      q: "How accurate is the scoring?",
      a: "Every job is scored on one fixed 100-point rubric. AI scoring can still vary by a few points between runs, so borderline scores from 67 to 73 are scored twice and averaged. Anything a posting does not state shows as N/A instead of a guess.",
    },
    {
      q: "Will I see the same job twice?",
      a: "No. A job is never listed twice, and no company gets more than 2 roles in a single day's feed.",
    },
    {
      q: "Can I use it for a different profile or team?",
      a: "Yes. Swap the resume library and adjust the remote, eligibility and size rules. The pipeline and rubric stay the same.",
    },
    {
      q: "How often does it run?",
      a: "Once a night, on a schedule. Each run covers the previous 24 hours and publishes a new dated table with 20 to 50 roles. If fewer than 20 truly qualify, it lists fewer and explains why.",
    },
  ],
};

export const finalCta = {
  title: "Tomorrow's shortlist is already being written.",
  body: "Open the file, pick a row, apply with the resume that's already chosen and scored.",
  primary: { label: "See the daily feed", href: "#sample-feed" } satisfies Cta,
  secondary: { label: "Read the FAQ", href: "#faq" } satisfies Cta,
  contactLead: "Questions first? Email",
};

export const footer = {
  tagline: site.tagline,
  emailLabel: "Email",
  links: [
    { label: "Privacy", to: "/privacy" },
    { label: "Terms", to: "/terms" },
    { label: "Changelog", to: "/changelog" },
  ] as const,
  contactLabel: "Contact",
  socialLabel: "Elsewhere",
};

export const legalUpdated = "2026-11-17";

export const privacyPage = {
  title: "Privacy",
  metaTitle: "Privacy — Daybreak",
  description: "How the Daybreak website handles your data: no sign-up, no forms, no analytics and no tracking.",
  sections: [
    { h: "The short version", p: "This site has no sign-up, no forms that submit data, no analytics and no tracking. We do not collect personal information through it." },
    { h: "Contacting us", p: "The only way to contact us from this site is email. Contact links open your own email app (mailto), and we only see what you choose to send." },
    { h: "Booking calendar", p: "The booking section can show an embedded Google Calendar appointment page. When it loads, Google may set its own cookies under Google's privacy policy. If you would rather not load it, use the \"Open booking page\" link instead." },
    { h: "Server logs", p: "The hosting provider may keep standard server logs, such as IP address, browser type and the pages requested, to run and secure the site." },
  ],
};

export const termsPage = {
  title: "Terms",
  metaTitle: "Terms — Daybreak",
  description: "The terms for using the Daybreak website: informational, provided as is, sample data only.",
  sections: [
    { h: "Informational site", p: "This website describes Daybreak and is provided as is, without warranties of any kind." },
    { h: "Sample data", p: "Example feeds on this site are sample data. Companies, roles and salaries shown are fictional." },
    { h: "No guaranteed outcome", p: "Daybreak does not guarantee any job, interview or other outcome." },
    { h: "Platforms and trademarks", p: "Daybreak is not affiliated with or endorsed by any job platform it reads from. All trademarks belong to their respective owners." },
    { h: "Changes", p: "These terms may change. The date above shows when they were last updated." },
  ],
};

export const changelogPage = {
  title: "Changelog",
  metaTitle: "Changelog — Daybreak",
  description: "What changed in Daybreak, newest first.",
  entries: [
    { date: "2026-11-13", text: "No more repeats: a job already listed on an earlier day is now caught even when it reappears on another platform or with a new link." },
    { date: "2026-11-12", text: "More sources and better filtering: added a ninth aggregator feed, repaired the largest feed, rebuilt the job-title filter and added 31 more company boards." },
    { date: "2026-11-12", text: "Fairer feeds: at most two roles per company per day, and borderline scores (67 to 73) are scored twice and averaged." },
    { date: "2026-11-12", text: "Cheaper scoring: the resume library index was trimmed by about 70%, cutting tokens per scored job from roughly 25k to 16k." },
    { date: "2026-11-11", text: "First full daily feed published: 36 roles, each with a chosen resume and a score." },
  ],
};
