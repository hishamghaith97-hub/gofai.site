import { displayName, getCurrentUser, initials } from "@/lib/current-user";

export async function UserBadge() {
  const user = await getCurrentUser();
  return (
    <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-light to-gold-dark font-display text-sm font-medium text-deep">
        {initials(user)}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-cream">{displayName(user)}</span>
        <span className="block truncate font-mono text-[11px] text-faint">{user.email}</span>
      </span>
    </div>
  );
}

export function UserBadgeSkeleton() {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5" aria-hidden>
      <span className="size-9 shrink-0 animate-pulse rounded-full bg-raised" />
      <span className="flex-1 space-y-1.5">
        <span className="block h-3 w-24 animate-pulse rounded bg-raised" />
        <span className="block h-2.5 w-32 animate-pulse rounded bg-raised" />
      </span>
    </div>
  );
}
