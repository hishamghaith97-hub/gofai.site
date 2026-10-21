import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { auth } from "@/auth";
import { isAllowedEmail } from "@/lib/allowed-email";

export type CurrentUser = {
  id: string;
  email: string;
  name: string | null;
};

// The single place pages read the signed-in user. Redirects to /login when there is no
// valid session, or when the email's domain is no longer on the allowed list.
// cache() makes every call in one request share a single session lookup.
export const getCurrentUser = cache(async (): Promise<CurrentUser> => {
  // Session checks always run per request, never during prerendering.
  await connection();
  const session = await auth();
  const user = session?.user;
  if (!user?.id || !user.email || !isAllowedEmail(user.email)) redirect("/login");
  return { id: user.id, email: user.email, name: user.name ?? null };
});

export function displayName(user: CurrentUser): string {
  if (user.name) return user.name;
  const local = user.email.split("@")[0];
  return local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

export function initials(user: CurrentUser): string {
  return displayName(user)
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
