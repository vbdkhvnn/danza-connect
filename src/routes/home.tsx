import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ChevronRight, Search } from "lucide-react";
import { AppHeader, Disclaimer, Screen, SectionHeading } from "@/components/app-shell";
import { EventPoster, StudyGroupCard, TimeRow } from "@/components/pieces";
import { announcements, clubs, events } from "@/data/mock";
import { useApp } from "@/lib/app-state";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Today at De Anza — DAnza" },
      {
        name: "description",
        content:
          "Your personalized campus feed: club meetings today, upcoming events, study groups for your courses, and club announcements.",
      },
      { property: "og:title", content: "Today at De Anza — DAnza" },
      {
        property: "og:description",
        content: "Club meetings today, upcoming events, and study groups for your courses.",
      },
    ],
  }),
  component: HomeScreen,
});

function HomeScreen() {
  const { state, track, toggleGroup } = useApp();
  const { profile, followedClubs, courses, joinedGroups, groups } = state;

  useEffect(() => {
    track("app_opened", { source: "home" });
  }, [track]);

  const hour = 13;
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const todayEvents = events.filter((e) => e.today);
  const upcoming = events.filter((e) => !e.today);
  const todayGroups = groups.filter((g) => courses.includes(g.course) && g.day === "Today");
  const yourGroups = groups
    .filter((g) => courses.includes(g.course) && g.day !== "Today")
    .slice(0, 2);
  const myClubs = clubs.filter((c) => followedClubs.includes(c.id));
  const relevantAnnouncements = announcements.filter((a) => followedClubs.includes(a.clubId));

  return (
    <Screen tab="home">
      <AppHeader
        title={`${greeting}, ${profile.firstName}`}
        subtitle={`${myClubs.length} clubs · ${courses.length} courses · 3 things happening today`}
      />

      <div className="px-5 pb-1">
        <Link
          to="/clubs"
          className="press flex items-center gap-2.5 rounded-2xl bg-surface px-4 py-3 shadow-soft"
        >
          <Search className="size-4 text-muted-foreground" />
          <span className="text-[14px] text-muted-foreground">
            Search clubs, events, courses, people
          </span>
        </Link>
      </div>

      <SectionHeading label="Today · Thu, Aug 27" />
      <div className="divide-y divide-hairline">
        {todayEvents.map((e) => (
          <TimeRow
            key={e.id}
            to="/events/$eventId"
            params={{ eventId: e.id }}
            emoji={e.category === "Sports" ? "🏀" : e.category === "Club meeting" ? "🌙" : "🎪"}
            title={e.title}
            line={`${e.time} · ${e.location} · ${e.host}`}
            right={<ChevronRight className="size-4 text-muted-foreground/50" />}
          />
        ))}
        {todayGroups.map((g) => (
          <TimeRow
            key={g.id}
            to="/study/$groupId"
            params={{ groupId: g.id }}
            emoji="📚"
            title={g.name}
            line={`${g.time} · ${g.location} · ${g.joined}/${g.capacity} joined`}
            tag={g.course}
            right={<ChevronRight className="size-4 text-muted-foreground/50" />}
          />
        ))}
      </div>

      <SectionHeading label="Upcoming events" action="See all" to="/clubs" />
      <div className="no-scrollbar flex gap-3.5 overflow-x-auto px-5 pb-1">
        {upcoming.map((e) => (
          <EventPoster key={e.id} event={e} />
        ))}
      </div>

      <SectionHeading label="Study groups for you" action="Study tab" to="/study" />
      <div className="space-y-3">
        {yourGroups.map((g) => (
          <StudyGroupCard
            key={g.id}
            group={g}
            joined={joinedGroups.includes(g.id)}
            onJoin={() => toggleGroup(g.id, "home")}
          />
        ))}
      </div>

      <SectionHeading label="Recent announcements" />
      <ul className="divide-y divide-hairline">
        {relevantAnnouncements.map((a) => (
          <li key={a.id}>
            <Link
              to="/clubs/$clubId"
              params={{ clubId: a.clubId }}
              className="press flex gap-3 px-5 py-3.5 active:bg-secondary/60"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-secondary">
                {a.emoji}
              </span>
              <span className="min-w-0 flex-1">
                <span className="text-[13px] font-semibold">{a.club}</span>
                <span className="ml-2 text-[11.5px] text-muted-foreground">{a.ago}</span>
                <span className="mt-0.5 block text-[13.5px] leading-snug">{a.body}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Disclaimer className="mt-8 mb-2" />
    </Screen>
  );
}
