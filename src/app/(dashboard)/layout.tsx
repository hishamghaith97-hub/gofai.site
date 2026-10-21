import { Suspense, type ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { UserBadge, UserBadgeSkeleton } from "@/components/UserBadge";
import { getCurrentUser } from "@/lib/current-user";

// Everything inside this group needs a signed-in GOF.ai user.
// The sidebar renders right away; page content waits for the session check.
export default function DashboardLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-screen">
      <Sidebar
        userSlot={
          <Suspense fallback={<UserBadgeSkeleton />}>
            <UserBadge />
          </Suspense>
        }
      />
      <main className="lg:pl-72">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-14 lg:py-16">
          <Suspense fallback={<PageSkeleton />}>
            <RequireUser>{children}</RequireUser>
          </Suspense>
        </div>
      </main>
    </div>
  );
}

async function RequireUser({ children }: { children: ReactNode }) {
  await getCurrentUser();
  return children;
}

function PageSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden>
      <div className="h-3 w-24 rounded bg-raised" />
      <div className="mt-5 h-12 w-80 max-w-full rounded bg-raised" />
      <div className="mt-4 h-4 w-64 max-w-full rounded bg-raised" />
      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-deep" />
        ))}
      </div>
    </div>
  );
}
