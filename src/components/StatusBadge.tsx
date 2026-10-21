import { statusLabel, type AutomationStatus } from "@/automations/registry";

const dotColor: Record<AutomationStatus, string> = {
  active: "bg-sage shadow-[0_0_10px] shadow-sage/70",
  paused: "bg-copper",
  draft: "bg-faint",
};

const badgeColor: Record<AutomationStatus, string> = {
  active: "border-sage/30 text-sage",
  paused: "border-copper/30 text-copper",
  draft: "border-line-strong text-mist",
};

export function StatusDot({ status }: { status: AutomationStatus }) {
  return (
    <span
      className={`size-1.5 shrink-0 rounded-full ${dotColor[status]} ${status === "active" ? "breathe" : ""}`}
      title={statusLabel[status]}
    />
  );
}

export function StatusBadge({ status }: { status: AutomationStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] uppercase ${badgeColor[status]}`}
    >
      <StatusDot status={status} />
      {statusLabel[status]}
    </span>
  );
}
