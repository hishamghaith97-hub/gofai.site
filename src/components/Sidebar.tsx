"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState, type ReactNode } from "react";
import { LayoutDashboard, Menu, Settings, X, type LucideIcon } from "lucide-react";
import { automations } from "@/automations/registry";
import { Logo } from "@/components/Logo";
import { StatusDot } from "@/components/StatusBadge";

// The current path is only known at request time, so the sidebar first renders with no
// link highlighted, then picks up the active link as the page streams in.
export function Sidebar({ userSlot }: { userSlot: ReactNode }) {
  return (
    <Suspense fallback={<SidebarView pathname="" userSlot={userSlot} />}>
      <SidebarWithPath userSlot={userSlot} />
    </Suspense>
  );
}

function SidebarWithPath({ userSlot }: { userSlot: ReactNode }) {
  return <SidebarView pathname={usePathname()} userSlot={userSlot} />;
}

function SidebarView({ pathname, userSlot }: { pathname: string; userSlot: ReactNode }) {
  // The mobile drawer remembers the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean) => setOpenOn(value ? pathname : null);

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line bg-deep/85 px-4 backdrop-blur-md lg:hidden">
        <Link href="/">
          <Logo />
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="-mr-2 rounded-full p-2 text-mist transition hover:bg-panel hover:text-cream"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 bg-night/70 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} aria-hidden />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-line bg-deep transition-transform duration-300 ease-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Gold glow at the top of the rail */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(18rem_10rem_at_30%_0%,rgb(198_161_91/0.12),transparent)]"
          aria-hidden
        />

        <div className="relative flex h-20 shrink-0 items-center justify-between px-6">
          <Link href="/">
            <Logo />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="-mr-2 rounded-full p-2 text-mist transition hover:bg-panel hover:text-cream lg:hidden"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="relative flex-1 overflow-y-auto px-4 py-4">
          <NavLink href="/" icon={LayoutDashboard} active={pathname === "/"}>
            Overview
          </NavLink>

          <p className="mt-8 mb-3 flex items-center gap-2 px-3 font-mono text-[10px] tracking-[0.25em] text-faint uppercase">
            Automations
            <span className="h-px flex-1 bg-line" aria-hidden />
            <span className="text-gold/80 tabular-nums">{String(automations.length).padStart(2, "0")}</span>
          </p>
          {automations.length === 0 ? (
            <p className="px-3 py-1.5 font-serif text-[15px] italic text-faint">None set up yet</p>
          ) : (
            <ul className="space-y-0.5">
              {automations.map((automation) => {
                const href = `/automations/${automation.slug}`;
                return (
                  <li key={automation.slug}>
                    <NavLink
                      href={href}
                      icon={automation.icon}
                      active={pathname === href}
                      trailing={<StatusDot status={automation.status} />}
                    >
                      {automation.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>

        <div className="relative shrink-0 space-y-1 border-t border-line p-4">
          <NavLink href="/settings" icon={Settings} active={pathname.startsWith("/settings")}>
            Settings
          </NavLink>
          {userSlot}
        </div>
      </aside>
    </>
  );
}

function NavLink({
  href,
  icon: Icon,
  active,
  trailing,
  children,
}: {
  href: string;
  icon: LucideIcon;
  active: boolean;
  trailing?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
        active ? "bg-panel text-cream" : "text-mist hover:bg-panel/60 hover:text-cream"
      }`}
    >
      {/* Gold marker on the active link */}
      <span
        className={`absolute top-1/2 -left-4 h-5 w-[2px] -translate-y-1/2 rounded-full bg-gold transition-opacity ${
          active ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      />
      <Icon
        className={`size-4 shrink-0 transition ${active ? "text-gold" : "text-faint group-hover:text-gold-light"}`}
        aria-hidden
      />
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {trailing}
    </Link>
  );
}
