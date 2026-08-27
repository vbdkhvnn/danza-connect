import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AtSign, CalendarClock, Instagram, Mail, MapPin, MessageCircle, Pencil } from "lucide-react";
import { DetailHeader, Phone } from "@/components/app-shell";
import { Tag } from "@/components/pieces";
import { announcements, clubs, events } from "@/data/mock";
import { useApp } from "@/lib/app-state";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/clubs/$clubId")({
  loader: ({ params }) => {
    const club = clubs.find((c) => c.id === params.clubId);
    if (!club) throw notFound();
    return { club };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Club not found — DAnza" }, { name: "robots", content: "noindex" }] };
    }
    const { club } = loaderData;
    const title = `${club.name} — DAnza`;
    const description = `${club.short}. Meets ${club.meeting.day.toLowerCase()} ${club.meeting.time} in ${club.meeting.room}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ClubProfile,
});

function ClubProfile() {
  const { club } = Route.useLoaderData();
  const { state, toggleClub, track } = useApp();
  const following = state.followedClubs.includes(club.id);
  const [tab, setTab] = useState<"about" | "events" | "posts">("about");

  useEffect(() => {
    track("club_viewed", { club_id: club.id, source: "club_profile" });
  }, [club.id, track]);

  const clubEvents = events.filter((e) => e.hostId === club.id);
  const clubPosts = announcements.filter((a) => a.clubId === club.id);

  return (
    <Phone>
      <div className="min-h-screen pb-16">
        <DetailHeader />
        <div className="px-5">
          <div className="flex items-start gap-4">
            <span className="grid size-[68px] place-items-center rounded-3xl bg-accent-soft text-3xl">
              {club.emoji}
            </span>
            <div className="min-w-0 flex-1 pt-1">
              <h1 className="text-[22px] leading-tight font-semibold">{club.name}</h1>
              <p className="mt-1 text-[13px] text-muted-foreground">
                {club.followers + (following ? 1 : 0)} followers
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Tag label={club.category} />
            {club.officer ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-bold tracking-wide text-primary uppercase">
                <Pencil className="size-3" /> You're an officer
              </span>
            ) : null}
          </div>
          <p className="mt-3 text-[14.5px] leading-relaxed text-foreground/85">{club.description}</p>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => toggleClub(club.id, "club_profile")}
              className={cn(
                "press flex-1 rounded-2xl py-3 text-[14.5px] font-semibold",
                following ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground",
              )}
            >
              {following ? "Following" : "Follow"}
            </button>
            {club.officer ? (
              <button
                type="button"
                className="press rounded-2xl bg-accent-soft px-4 text-[14px] font-semibold text-accent-foreground"
              >
                Officer tools
              </button>
            ) : null}
          </div>
        </div>

        {/* Weekly meeting — the single most important thing on this screen */}
        <div className="mx-5 mt-5 overflow-hidden rounded-3xl bg-primary text-primary-foreground">
          <div className="px-5 py-4">
            <p className="text-[11px] font-bold tracking-[0.09em] text-primary-foreground/70 uppercase">
              Weekly meeting
            </p>
            <p className="mt-2 font-display text-[22px] leading-tight font-semibold">
              {club.meeting.day}
            </p>
            <p className="mt-1 inline-flex items-center gap-2 text-[15px] text-primary-foreground/90">
              <CalendarClock className="size-4" /> {club.meeting.time}
            </p>
            <p className="mt-1 inline-flex items-center gap-2 text-[15px] text-primary-foreground/90">
              <MapPin className="size-4" /> {club.meeting.room}
            </p>
          </div>
          <div className="border-t border-primary-foreground/15 px-5 py-2.5 text-[12px] text-primary-foreground/70">
            Officers keep this updated — followers get a reminder 1 hour before.
          </div>
        </div>

        <div className="mt-5 flex gap-1 px-5">
          {(["about", "events", "posts"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "press flex-1 rounded-xl py-2 text-[13.5px] font-semibold capitalize",
                tab === t ? "bg-secondary" : "text-muted-foreground",
              )}
            >
              {t === "posts" ? "Announcements" : t}
            </button>
          ))}
        </div>

        {tab === "about" ? (
          <ul className="mt-3 px-5">
            {club.instagram ? (
              <li className="hairline-y flex items-center gap-3 py-3 text-[14px]">
                <Instagram className="size-4 text-muted-foreground" /> {club.instagram}
              </li>
            ) : null}
            {club.discord ? (
              <li className="hairline-y flex items-center gap-3 py-3 text-[14px]">
                <MessageCircle className="size-4 text-muted-foreground" /> {club.discord}
              </li>
            ) : null}
            {club.email ? (
              <li className="hairline-y flex items-center gap-3 py-3 text-[14px]">
                <Mail className="size-4 text-muted-foreground" /> {club.email}
              </li>
            ) : null}
            <li className="flex items-center gap-3 py-3 text-[13px] text-muted-foreground">
              <AtSign className="size-4" /> Club listing maintained by student officers, not by the
              college.
            </li>
          </ul>
        ) : null}

        {tab === "events" ? (
          <ul className="mt-2 divide-y divide-hairline">
            {clubEvents.length ? (
              clubEvents.map((e) => (
                <li key={e.id}>
                  <Link
                    to="/events/$eventId"
                    params={{ eventId: e.id }}
                    className="press block px-5 py-3.5 active:bg-secondary/60"
                  >
                    <p className="font-semibold">{e.title}</p>
                    <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                      {e.dayLabel} · {e.time} · {e.location} · {e.going} going
                    </p>
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-5 py-6 text-[13.5px] text-muted-foreground">
                No upcoming events posted yet.
              </li>
            )}
          </ul>
        ) : null}

        {tab === "posts" ? (
          <ul className="mt-2 divide-y divide-hairline">
            {clubPosts.length ? (
              clubPosts.map((a) => (
                <li key={a.id} className="px-5 py-3.5">
                  <p className="text-[11.5px] text-muted-foreground">{a.ago} ago</p>
                  <p className="mt-1 text-[14.5px] leading-snug">{a.body}</p>
                </li>
              ))
            ) : (
              <li className="px-5 py-6 text-[13.5px] text-muted-foreground">No announcements yet.</li>
            )}
          </ul>
        ) : null}
      </div>
    </Phone>
  );
}
