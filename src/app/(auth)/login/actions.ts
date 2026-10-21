"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { allowedDomains, isAllowedEmail, normalizeEmail } from "@/lib/allowed-email";

export type LoginState = { error?: string; email?: string };

export async function requestMagicLink(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = normalizeEmail(String(formData.get("email") ?? ""));

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Enter a valid email address.", email };
  }
  // Checked here for a clear message; the signIn callback in src/auth.ts enforces it again.
  if (!isAllowedEmail(email)) {
    const domains = allowedDomains().map((domain) => `@${domain}`).join(" or ");
    return { error: `Only ${domains} email addresses can sign in.`, email };
  }

  const sendFailed = { error: "We couldn't send the sign-in email. Try again in a minute.", email };
  let next: string;
  try {
    next = await signIn("resend", { email, redirectTo: "/", redirect: false });
  } catch (error) {
    if (error instanceof AuthError) {
      console.error("Magic link request failed:", error);
      return sendFailed;
    }
    throw error;
  }
  // Auth.js reports a failed send (e.g. Resend rejected it) by pointing at the error page
  // instead of throwing, so only a redirect to a verify-request page means the link went out.
  // From a server action it points at its built-in /api/auth/verify-request rather than
  // pages.verifyRequest, so both count as success.
  const pathname = new URL(next, "http://localhost").pathname;
  if (pathname !== "/check-email" && pathname !== "/api/auth/verify-request") {
    console.error("Magic link request failed: Auth.js redirected to", next);
    return sendFailed;
  }

  redirect(`/check-email?email=${encodeURIComponent(email)}`);
}
