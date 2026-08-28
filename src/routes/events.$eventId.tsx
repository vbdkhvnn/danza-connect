import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { Bookmark, CalendarClock, MapPin, Share2, Users } from "lucide-react";
import { DetailHeader, Phone } from "@/components/app-shell";
import { Avatar, Tag } from "@/components/pieces";
import { events } from "@/data/mock";
import { useApp } from "@/lib/app-state";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events/$eventId")({
  loader: ({ params }) => {
    const event = events.find((e) => e.id === params.eventId);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Event not found — DAnza" }, { name: "robots", content: "noindex" }] };
    }
    const { event } = loaderData;
    const title = `${event.title} — DAnza`;
    const description = `${event.dayLabel} at ${event.time}, ${event.location}. Hosted by ${event.host}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: EventDetail,
});

function EventDetail() {
  const { event } = Route.useLoaderData();
  const { state, setRsvp, toggleSaveEvent, track } = useApp();
  const rsvp = state.rsvps[event.id];
  const saved = state.savedEvents.includes(event.id);

  useEffect(() => {
    track("event_viewed", { event_id: event.id, source: "event_detail" });
  }, [event.id, track]);

  return (
    <Phone>
      <div className="min-h-screen pb-32">
        {event.image ? (
          <div className="relative">
            <img
              src={event.image}
              alt={event.title}
              width={1024}
              height={640}
              className="h-[240px] w-full object-cover"
            />
            <div className="absolute inset-x-0 top-0">
              <DetailHeader transparent />
            </div>
          </div>
        ) : (
          <DetailHeader />
        )}

        <div className="px-5 pt-4">
          <div className="flex items-center gap-2">
            <Tag label={event.category} />
            <span className="text-[12px] font-semibold text-muted-foreground">
              {event.going} going
            </span>
          </div>
          <h1 className="mt-2.5 text-[26px] leading-tight font-semibold">{event.title}</h1>

          <div className="mt-4 space-y-2.5">
            <p className="flex items-center gap-3 text-[14.5px]">
              <CalendarClock className="size-4 shrink-0 text-primary" />
              {event.dayLabel} · {event.time} – {event.endTime}
            </p>
            <p className="flex items-center gap-3 text-[14.5px]">
              <MapPin className="size-4 shrink-0 text-primary" />
              {event.location}
            </p>
            {event.capacity ? (
              <p className="flex items-center gap-3 text-[14.5px]">
                <Users className="size-4 shrink-0 text-primary" />
                {event.going} of {event.capacity} spots taken
              </p>
            ) : null}
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-surface p-3.5 shadow-soft">
            <Avatar initials={event.host.slice(0, 2).toUpperCase()} tint="tint-plum" />
            <div className="flex-1">
              <p className="text-[11px] text-muted-foreground">Hosted by</p>
              <p className="text-[14.5px] font-semibold">{event.host}</p>
            </div>
            {event.hostId ? (
              <Link
                to="/clubs/$clubId"
                params={{ clubId: event.hostId }}
                className="press rounded-xl bg-secondary px-3 py-2 text-[12.5px] font-semibold"
              >
                View club
              </Link>
            ) : null}
          </div>

          <p className="mt-5 text-[14.5px] leading-relaxed text-foreground/85">{event.description}</p>

          <div className="mt-6">
            <p className="eyebrow">Who's going</p>
            <div className="mt-2 flex -space-x-2">
              {["JL", "PR", "OH", "SM", "DK", "AN"].map((i, idx) => (
                <span key={i} className="ring-2 ring-background rounded-full">
                  <Avatar
                    initials={i}
                    size="sm"
                    tint={["tint-blue", "tint-green", "tint-gold", "tint-plum", "tint-teal"][idx % 5] ?? "tint-plum"}
                  />
                </span>
              ))}
              <span className="ml-4 self-center text-[12.5px] text-muted-foreground">
                +{event.going - 6} more
              </span>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-1/2 w-full max-w-[420px] -translate-x-1/2 border-t border-hairline bg-surface/95 px-5 py-3.5 backdrop-blur-xl">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setRsvp(event.id, "going")}
              className={cn(
                "press flex-1 rounded-2xl py-3 text-[14.5px] font-semibold",
                rsvp === "going" ? "bg-primary text-primary-foreground" : "bg-secondary",
              )}
            >
              {rsvp === "going" ? "You're going ✓" : "Going"}
            </button>
            <button
              type="button"
              onClick={() => setRsvp(event.id, "interested")}
              className={cn(
                "press flex-1 rounded-2xl py-3 text-[14.5px] font-semibold",
                rsvp === "interested" ? "bg-accent text-accent-foreground" : "bg-secondary",
              )}
            >
              Interested
            </button>
            <button
              type="button"
              onClick={() => toggleSaveEvent(event.id)}
              aria-label="Save event"
              className="press grid size-12 place-items-center rounded-2xl bg-secondary"
            >
              <Bookmark className={cn("size-5", saved && "fill-primary text-primary")} />
            </button>
            <button
              type="button"
              aria-label="Share event"
              className="press grid size-12 place-items-center rounded-2xl bg-secondary"
            >
              <Share2 className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </Phone>
  );
}
