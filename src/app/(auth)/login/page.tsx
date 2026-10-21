import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { auth } from "@/auth";
import { isAllowedEmail } from "@/lib/allowed-email";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <>
      <Suspense fallback={null}>
        <RedirectIfSignedIn />
      </Suspense>
      <p className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase">╱ Sign in</p>
      <h1 className="mt-4 font-display text-4xl font-light tracking-tight text-cream">
        Welcome <span className="font-serif font-normal italic text-gold">back</span>
      </h1>
      <p className="mt-3 mb-10 text-[15px] leading-7 text-mist">
        Enter your GOF.ai email and we&apos;ll send you a link to sign in. No password needed.
      </p>
      <LoginForm />
    </>
  );
}

async function RedirectIfSignedIn() {
  await connection();
  const session = await auth();
  if (session?.user && isAllowedEmail(session.user.email)) redirect("/");
  return null;
}
