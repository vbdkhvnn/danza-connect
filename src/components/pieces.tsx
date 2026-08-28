import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Users } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CATEGORY_TINT, type CampusEvent, type Club, type StudyGroup } from "@/data/mock";

export function Avatar({
  initials,
  size = "md",
  tint = "tint-plum",
}: {
  initials: string;
  size?: "sm" | "md" | "lg" | "xl";
  tint?: string;
}) {
  const sizes = {
    sm: "size-7 text-[10px]",
    md: "size-9 text-xs",
    lg: "size-11 text-sm",
    xl: "size-20 text-2xl",
  } as const;
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-semibold text-white",
        sizes[size],
      )}
      style={{ backgroundColor: `var(--${tint})` }}
    >
      {initials}
    </span>
  );
}

export function Chip({
  children,
  active,
  onClick,
  className,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "press rounded-full px-3.5 py-2 text-[13px] font-semibold whitespace-nowrap",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground/80",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Tag({ label, tint }: { label: string; tint?: string }) {
  const color = tint ?? CATEGORY_TINT[label] ?? "tint-gold";
  return (
    <span
      className="rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase"
      style={{ color: `var(--${color})`, backgroundColor: `color-mix(in oklab, var(--${color}) 12%, white)` }}
    >
      {label}
    </span>
  );
}

export function MetaRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-muted-foreground">
      {children}
    </div>
  );
}

export function Meta({ icon: Icon, children }: { icon: typeof Clock; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1">
      <Icon className="size-3.5" />
      {children}
    </span>
  );
}

/** Big visual event card (used for image-led events). */
export function EventPoster({ event }: { event: CampusEvent }) {
  return (
    <Link
      to="/events/$eventId"
      params={{ eventId: event.id }}
      className="press block w-[268px] shrink-0"
    >
      <div className="relative h-[150px] overflow-hidden rounded-2xl bg-secondary">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            loading="lazy"
            width={1024}
            height={640}
            className="size-full object-cover"
          />
        ) : null}
        <span className="absolute top-2.5 left-2.5 rounded-full bg-surface/95 px-2.5 py-1 text-[11px] font-bold">
          {event.day} · {event.time}
        </span>
      </div>
      <p className="mt-2.5 leading-snug font-semibold">{event.title}</p>
      <p className="mt-0.5 text-[12.5px] text-muted-foreground">
        {event.host} · {event.location}
      </p>
    </Link>
  );
}

/** Compact list row for anything time-based. */
export function TimeRow({
  to,
  params,
  emoji,
  title,
  line,
  right,
  tag,
}: {
  to: string;
  params?: Record<string, string>;
  emoji: string;
  title: string;
  line: string;
  right?: ReactNode;
  tag?: string;
}) {
  return (
    <Link
      to={to as never}
      params={(params ?? {}) as never}
      className="press flex items-center gap-3.5 px-5 py-3.5 active:bg-secondary/60"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary text-lg">
        {emoji}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate font-semibold">{title}</span>
          {tag ? <Tag label={tag} /> : null}
        </span>
        <span className="mt-0.5 block truncate text-[12.5px] text-muted-foreground">{line}</span>
      </span>
      {right}
    </Link>
  );
}

export function ClubRow({ club, following }: { club: Club; following?: boolean }) {
  return (
    <Link
      to="/clubs/$clubId"
      params={{ clubId: club.id }}
      className="press flex items-center gap-3.5 px-5 py-3.5 active:bg-secondary/60"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-xl">
        {club.emoji}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate font-semibold">{club.name}</span>
          {following ? <span className="text-[11px] font-semibold text-primary">Following</span> : null}
        </span>
        <span className="mt-0.5 block truncate text-[12.5px] text-muted-foreground">
          {club.meeting.day} · {club.meeting.time.split(" – ")[0]} · {club.meeting.room}
        </span>
      </span>
      <Tag label={club.category} />
    </Link>
  );
}

export function StudyGroupCard({
  group,
  joined,
  onJoin,
}: {
  group: StudyGroup;
  joined: boolean;
  onJoin: () => void;
}) {
  const pct = Math.round((group.joined / group.capacity) * 100);
  return (
    <div className="mx-5 rounded-3xl bg-surface p-4 shadow-soft">
      <Link to="/study/$groupId" params={{ groupId: group.id }} className="block">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-primary-soft px-2 py-1 text-[11px] font-bold text-primary">
            {group.course}
          </span>
          <span className="text-[11px] font-semibold text-muted-foreground">{group.mode}</span>
        </div>
        <p className="mt-2 leading-snug font-semibold">{group.name}</p>
        <MetaRow>
          <Meta icon={Clock}>
            {group.day} · {group.time}
          </Meta>
          <Meta icon={MapPin}>{group.location}</Meta>
        </MetaRow>
        <div className="mt-3 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
          </div>
          <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-muted-foreground">
            <Users className="size-3.5" />
            {group.joined}/{group.capacity}
          </span>
        </div>
      </Link>
      <button
        type="button"
        onClick={onJoin}
        className={cn(
          "press mt-3.5 w-full rounded-2xl py-2.5 text-sm font-semibold",
          joined ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground",
        )}
      >
        {joined ? "Joined · Leave group" : "Join group"}
      </button>
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  className,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "press w-full rounded-2xl bg-primary py-3.5 text-[15px] font-semibold text-primary-foreground disabled:opacity-40",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-[11.5px] text-muted-foreground">{hint}</span> : null}
    </label>
  );
}

export const inputClass =
  "w-full rounded-2xl border border-input bg-surface px-4 py-3 text-[15px] outline-none placeholder:text-muted-foreground/60 focus:border-primary/40 focus:ring-2 focus:ring-primary/15";
