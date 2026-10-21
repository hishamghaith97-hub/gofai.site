"use client";

import { useActionState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { requestMagicLink, type LoginState } from "./actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(requestMagicLink, {});

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="email" className="font-mono text-[10px] tracking-[0.22em] text-mist uppercase">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoFocus
          autoComplete="email"
          placeholder="you@gofai.site"
          defaultValue={state.email}
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "email-error" : undefined}
          className="mt-2 block w-full border-0 border-b border-line-strong bg-transparent px-0 py-3 text-lg text-cream caret-gold outline-none transition placeholder:text-faint focus:border-gold aria-invalid:border-rose"
        />
        {state.error && (
          <p id="email-error" role="alert" className="mt-3 text-sm text-rose">
            {state.error}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gold px-5 py-3.5 text-sm font-semibold text-deep shadow-[0_10px_40px_-12px] shadow-gold/60 transition hover:bg-gold-light disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? (
          <>
            <LoaderCircle className="size-4 animate-spin" aria-hidden />
            Sending link…
          </>
        ) : (
          <>
            Email me a sign-in link
            <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
