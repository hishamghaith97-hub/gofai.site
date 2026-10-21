import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Activity, ArrowUpRight, Workflow } from "lucide-react";
import { automations } from "@/automations/registry";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { displayName, getCurrentUser } from "@/lib/current-user";
import { stagger } from "@/lib/stagger";

export const metadata: Metadata = { title: "Overview" };

export default function DashboardPage() {
  const count = (status: string) => automations.filter((automation) => automation.status === status).length;

  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title={
          <>
            Welcome back
            <Suspense fallback={null}>
              <FirstName />
            </Suspense>
          </>
        }
        description="Every automation working for your team, and what each one has been doing."
      />

      <section
        className="rise grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4"
        style={stagger(4)}
        aria-label="Totals"
      >
        <Stat index="01" label="Automations" value={automations.length} />
        <Stat index="02" label="Active" value={count("active")} accent="text-sage" />
        <Stat index="03" label="Paused" value={count("paused")} accent="text-copper" />
        <Stat index="04" label="Drafts" value={count("draft")} />
      </section>

      <section className="rise mt-16" style={stagger(5)}>
        <SectionLabel index="05">Your automations</SectionLabel>
        {automations.length === 0 ? (
          <EmptyState
            icon={Workflow}
            title="No automations yet"
            body="Automations set up for your team will show up here and in the sidebar."
          />
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {automations.map(({ slug, name, description, icon: Icon, status }, i) => (
              <li key={slug} className="rise" style={stagger(6 + i)}>
                <Link
                  href={`/automations/${slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-deep p-6 transition duration-300 hover:-translate-y-0.5 hover:border-gold/40"
                >
                  <span
                    className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-gold/10 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100"
                    aria-hidden
                  />
                  <div className="flex items-start justify-between">
                    <span className="grid size-11 place-items-center rounded-full bg-panel ring-1 ring-line-strong transition group-hover:ring-gold/50">
                      <Icon className="size-[18px] text-gold-light" aria-hidden />
                    </span>
                    <ArrowUpRight
                      className="size-4 text-faint transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
                      aria-hidden
                    />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-light text-cream">{name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-mist">{description}</p>
                  <div className="mt-6">
                    <StatusBadge status={status} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rise mt-16" style={stagger(6)}>
        <SectionLabel index="06">Recent activity</SectionLabel>
        <EmptyState
          icon={Activity}
          title="No runs yet"
          body="Each time an automation runs, it will be listed here with its result."
        />
      </section>
    </>
  );
}

async function FirstName() {
  const user = await getCurrentUser();
  return (
    <>
      ,{" "}
      <span className="font-serif font-normal italic text-gold">{displayName(user).split(" ")[0]}</span>
    </>
  );
}

function Stat({
  index,
  label,
  value,
  accent = "text-cream",
}: {
  index: string;
  label: string;
  value: number;
  accent?: string;
}) {
  return (
    <div className="group relative bg-deep p-5 transition hover:bg-panel sm:p-6">
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] uppercase">
        <span className="text-mist">{label}</span>
        <span className="text-gold/70">{index}</span>
      </div>
      <p className={`mt-6 font-display text-5xl leading-none sm:text-6xl font-extralight tabular-nums ${accent}`}>
        {String(value).padStart(2, "0")}
      </p>
      <span
        className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gold transition duration-500 group-hover:scale-x-100"
        aria-hidden
      />
    </div>
  );
}
