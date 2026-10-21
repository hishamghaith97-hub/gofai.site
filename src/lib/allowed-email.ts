// Only people with an email on one of these domains can sign in.
// Matching is exact: "gofai.site" allows name@gofai.site but not name@team.gofai.site or name@notgofai.site.
const DEFAULT_DOMAINS = "gofai.site";

export function allowedDomains(): string[] {
  return (process.env.ALLOWED_EMAIL_DOMAINS || DEFAULT_DOMAINS)
    .split(",")
    .map((domain) => domain.trim().toLowerCase().replace(/^@/, ""))
    .filter(Boolean);
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isAllowedEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const normalized = normalizeEmail(email);
  const at = normalized.lastIndexOf("@");
  if (at < 1 || at === normalized.length - 1) return false;
  return allowedDomains().includes(normalized.slice(at + 1));
}
