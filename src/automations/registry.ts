import type { LucideIcon } from "lucide-react";

export type AutomationStatus = "active" | "paused" | "draft";

export type Automation = {
  /** URL segment: the automation's page is /automations/<slug>. */
  slug: string;
  name: string;
  /** One sentence shown on the dashboard and at the top of the automation's page. */
  description: string;
  /** Any icon from lucide-react, e.g. `Mail` or `FileText`. */
  icon: LucideIcon;
  status: AutomationStatus;
  /** ID of the Trigger.dev task in src/trigger that runs this automation, once it exists. */
  taskId?: string;
};

// Every automation the team can see. Each entry gets a link in the sidebar,
// a card on the dashboard, and its own page.
//
// To add one, import its icon from lucide-react and add an entry, for example:
//
//   {
//     slug: "invoice-reminders",
//     name: "Invoice reminders",
//     description: "Emails clients whose invoices are overdue.",
//     icon: Receipt,
//     status: "draft",
//     taskId: "invoice-reminders",
//   },
export const automations: Automation[] = [];

export function getAutomation(slug: string): Automation | undefined {
  return automations.find((automation) => automation.slug === slug);
}

export const statusLabel: Record<AutomationStatus, string> = {
  active: "Active",
  paused: "Paused",
  draft: "Draft",
};
