import { Link, useRouter } from "@tanstack/react-router";
import {
  Bell,
  ChevronLeft,
  Compass,
  Home,
  BookOpen,
  Users,
  User,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/app-state";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("brand-wordmark text-primary", className)}>
      <span>DA</span>
      <span className="text-accent-foreground/80">nza</span>
    </span>
  );
}

/** Centered phone-width canvas. Everything renders inside this. */
export function Phone({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="flex min-h-screen justify-center">
      <div
        className={cn(
          "relative w-full max-w-[420px] bg-background shadow-[0_0_60px_oklch(0.3_0.05_20/8%)]",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function Screen({
  children,
  tab,
  className,
}: {
  children: ReactNode;
  tab?: TabKey;
  className?: string;
}) {
  return (
    <Phone>
      <div className={cn("min-h-screen pb-28", className)}>{children}</div>
      {tab ? <BottomNav active={tab} /> : null}
    </Phone>
  );
}

export function AppHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const { unreadCount } = useApp();
  return (
    <header className="sticky top-0 z-20 bg-background/85 px-5 pt-6 pb-3 backdrop-blur-xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[26px] leading-tight font-semibold">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
        <Link
          to="/notifications"
          className="press relative -mt-1 grid size-10 place-items-center rounded-full bg-surface shadow-soft"
          aria-label="Notifications"
        >
          <Bell className="size-[18px] text-foreground/70" />
          {unreadCount > 0 ? (
            <span className="absolute top-1.5 right-1.5 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
              {unreadCount}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}

export function DetailHeader({
  title,
  action,
  transparent,
}: {
  title?: string;
  action?: ReactNode;
  transparent?: boolean;
}) {
  const router = useRouter();
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex items-center gap-3 px-4 py-3",
        transparent ? "bg-transparent" : "bg-background/85 backdrop-blur-xl",
      )}
    >
      <button
        type="button"
        onClick={() => router.history.back()}
        aria-label="Back"
        className={cn(
          "press grid size-9 shrink-0 place-items-center rounded-full",
          transparent ? "bg-surface/90 shadow-soft" : "bg-secondary",
        )}
      >
        <ChevronLeft className="size-5" />
      </button>
      {title ? (
        <h2 className="truncate text-base font-semibold">{title}</h2>
      ) : (
        <span className="flex-1" />
      )}
      <div className="ml-auto">{action}</div>
    </header>
  );
}

export type TabKey = "home" | "clubs" | "study" | "social" | "profile";

const TABS: { key: TabKey; label: string; to: string; icon: LucideIcon }[] = [
  { key: "home", label: "Home", to: "/home", icon: Home },
  { key: "clubs", label: "Clubs", to: "/clubs", icon: Compass },
  { key: "study", label: "Study", to: "/study", icon: BookOpen },
  { key: "social", label: "Social", to: "/social", icon: Users },
  { key: "profile", label: "Profile", to: "/profile", icon: User },
];

export function BottomNav({ active }: { active: TabKey }) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[420px] -translate-x-1/2 border-t border-hairline bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
      <ul className="flex items-stretch justify-between px-2 pt-2 pb-2">
        {TABS.map(({ key, label, to, icon: Icon }) => {
          const isActive = key === active;
          return (
            <li key={key} className="flex-1">
              <Link
                to={to}
                className="press flex flex-col items-center gap-1 py-1"
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  className={cn(
                    "size-[21px]",
                    isActive ? "text-primary" : "text-muted-foreground/70",
                  )}
                  strokeWidth={isActive ? 2.4 : 1.8}
                />
                <span
                  className={cn(
                    "text-[10px] font-semibold tracking-wide",
                    isActive ? "text-primary" : "text-muted-foreground/70",
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function SectionHeading({
  label,
  action,
  to,
}: {
  label: string;
  action?: string;
  to?: string;
}) {
  return (
    <div className="flex items-baseline justify-between px-5 pt-6 pb-2">
      <h3 className="eyebrow">{label}</h3>
      {action && to ? (
        <Link to={to} className="text-[13px] font-semibold text-primary">
          {action}
        </Link>
      ) : null}
    </div>
  );
}

export function Disclaimer({ className }: { className?: string }) {
  return (
    <p className={cn("px-5 text-[11px] leading-relaxed text-muted-foreground/80", className)}>
      Independent student-built platform for the De Anza community. Not affiliated with or endorsed
      by De Anza College.
    </p>
  );
}
