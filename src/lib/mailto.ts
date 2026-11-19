export type MailtoHref = `mailto:${string}`;

/** Builds a mailto link with an optional, safely encoded subject and body. */
export function buildMailto(to: string, opts: { subject?: string; body?: string } = {}): MailtoHref {
  const params: string[] = [];
  if (opts.subject) params.push(`subject=${encodeURIComponent(opts.subject)}`);
  if (opts.body) params.push(`body=${encodeURIComponent(opts.body)}`);
  return `mailto:${to}${params.length ? `?${params.join("&")}` : ""}`;
}
