import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { LogOut, MonitorSmartphone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SubmitButton } from "@/components/SubmitButton";
import { displayName, getCurrentUser, initials } from "@/lib/current-user";
import { stagger } from "@/lib/stagger";
import { signOutAction, signOutEverywhereAction } from "./actions";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <>
      <PageHeader eyebrow="Settings" title="Your account" description="Who you're signed in as, and where." />

      <div className="max-w-3xl space-y-6">
        <Card index="01" title="Account" i={4}>
          <Suspense fallback={<AccountSkeleton />}>
            <AccountDetails />
          </Suspense>
          <p className="mt-6 border-t border-line pt-5 font-serif text-[17px] italic text-mist">
            You sign in with a link sent to this email. There is no password to manage.
          </p>
        </Card>

        <Card index="02" title="Sign out" i={5}>
          <Row title="This device" body="Sign out of the dashboard in this browser.">
            <form action={signOutAction}>
              <SubmitButton icon={<LogOut className="size-4" aria-hidden />} pendingLabel="Signing out…">
                Sign out
              </SubmitButton>
            </form>
          </Row>
          <div className="my-5 h-px bg-line" />
          <Row title="All devices" body="Sign out everywhere, for example after using a shared or lost computer.">
            <form action={signOutEverywhereAction}>
              <SubmitButton
                variant="danger"
                icon={<MonitorSmartphone className="size-4" aria-hidden />}
                pendingLabel="Signing out…"
              >
                Sign out everywhere
              </SubmitButton>
            </form>
          </Row>
        </Card>
      </div>
    </>
  );
}

async function AccountDetails() {
  const user = await getCurrentUser();
  return (
    <div className="flex items-center gap-5">
      <span className="grid size-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-light to-gold-dark font-display text-xl text-deep ring-4 ring-gold/10">
        {initials(user)}
      </span>
      <div className="min-w-0">
        <p className="truncate font-display text-2xl font-light text-cream">{displayName(user)}</p>
        <p className="mt-0.5 truncate font-mono text-xs text-mist">{user.email}</p>
      </div>
    </div>
  );
}

function AccountSkeleton() {
  return (
    <div className="flex items-center gap-5" aria-hidden>
      <span className="size-16 shrink-0 animate-pulse rounded-full bg-raised" />
      <span className="flex-1 space-y-2">
        <span className="block h-6 w-48 animate-pulse rounded bg-raised" />
        <span className="block h-3 w-56 animate-pulse rounded bg-raised" />
      </span>
    </div>
  );
}

function Card({ index, title, i, children }: { index: string; title: string; i: number; children: ReactNode }) {
  return (
    <section className="rise overflow-hidden rounded-2xl border border-line bg-deep" style={stagger(i)}>
      <h2 className="flex items-center gap-3 border-b border-line px-7 py-4 font-mono text-[11px] tracking-[0.22em] text-mist uppercase">
        <span className="text-gold">{index}</span>
        {title}
      </h2>
      <div className="p-7">{children}</div>
    </section>
  );
}

function Row({ title, body, children }: { title: string; body: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-cream">{title}</p>
        <p className="mt-0.5 text-sm text-mist">{body}</p>
      </div>
      {children}
    </div>
  );
}
