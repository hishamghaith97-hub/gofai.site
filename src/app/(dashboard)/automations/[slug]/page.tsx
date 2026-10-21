import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { History } from "lucide-react";
import { getAutomation } from "@/automations/registry";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader, SectionLabel } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { stagger } from "@/lib/stagger";

export async function generateMetadata({ params }: PageProps<"/automations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: getAutomation(slug)?.name ?? "Automation" };
}

// One page per entry in src/automations/registry.ts. Each automation can grow its own
// controls and run history here once its Trigger.dev task exists.
export default async function AutomationPage({ params }: PageProps<"/automations/[slug]">) {
  const { slug } = await params;
  const automation = getAutomation(slug);
  if (!automation) notFound();

  const Icon = automation.icon;

  return (
    <>
      <PageHeader
        eyebrow={
          <span className="inline-flex items-center gap-2">
            <Icon className="size-3.5" aria-hidden />
            Automation
          </span>
        }
        title={automation.name}
        description={automation.description}
        actions={<StatusBadge status={automation.status} />}
      />

      <section className="rise" style={stagger(4)}>
        <SectionLabel index="01">Run history</SectionLabel>
        <EmptyState
          icon={History}
          title="No runs yet"
          body="When this automation runs, each run will be listed here with its status and result."
        />
      </section>
    </>
  );
}
