import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { AppHeader, Screen, SectionHeading } from "@/components/app-shell";
import { Chip, ClubRow, inputClass } from "@/components/pieces";
import { CLUB_CATEGORIES, COURSE_CATALOG, clubs, events } from "@/data/mock";
import { useApp } from "@/lib/app-state";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/clubs/")({
  head: () => ({
    meta: [
      { title: "Club directory — DAnza" },
      {
        name: "description",
        content:
          "Browse De Anza student clubs by category, see weekly meeting times and rooms, and follow the ones you care about.",
      },
      { property: "og:title", content: "Club directory — DAnza" },
      {
        property: "og:description",
        content: "Every club, its weekly meeting time, and its upcoming events in one directory.",
      },
    ],
  }),
  component: ClubsScreen,
});

function ClubsScreen() {
  const { state, track } = useApp();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    track("search_performed", { source: "clubs" });
    return {
      clubs: clubs.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.short.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q),
      ),
      courses: COURSE_CATALOG.filter(
        (c) => c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q),
      ),
      groups: state.groups.filter(
        (g) => g.course.toLowerCase().includes(q) || g.name.toLowerCase().includes(q),
      ),
      events: events.filter((e) => e.title.toLowerCase().includes(q)),
    };
  }, [query, state.groups, track]);

  const filtered = category ? clubs.filter((c) => c.category === category) : clubs;
  const followed = clubs.filter((c) => state.followedClubs.includes(c.id));
  const featured = clubs.filter((c) => c.featured);

  return (
    <Screen tab="clubs">
      <AppHeader title="Clubs" subtitle="Every club, one place — with meeting times that stay current" />

      <div className="px-5">
        <div className="flex items-center gap-2.5 rounded-2xl bg-surface px-4 shadow-soft">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “physics” or “free food”"
            className={cn(inputClass, "border-0 bg-transparent px-0 shadow-none focus:ring-0")}
          />
          {query ? (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
              <X className="size-4 text-muted-foreground" />
            </button>
          ) : null}
        </div>
      </div>

      {results ? (
        <div className="pt-2">
          <SectionHeading label={`Clubs · ${results.clubs.length}`} />
          <div className="divide-y divide-hairline">
            {results.clubs.map((c) => (
              <ClubRow key={c.id} club={c} following={state.followedClubs.includes(c.id)} />
            ))}
          </div>
          {results.courses.length ? (
            <>
              <SectionHeading label="Courses" />
              <ul className="px-5">
                {results.courses.map((c) => (
                  <li key={c.code} className="hairline-y py-2.5 text-[14px]">
                    <span className="font-semibold">{c.code}</span>{" "}
                    <span className="text-muted-foreground">· {c.title}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {results.groups.length ? (
            <>
              <SectionHeading label="Study groups" />
              <ul className="px-5">
                {results.groups.map((g) => (
                  <li key={g.id} className="hairline-y py-2.5 text-[14px]">
                    <Link to="/study/$groupId" params={{ groupId: g.id }}>
                      <span className="font-semibold">{g.course}</span>{" "}
                      <span className="text-muted-foreground">
                        · {g.name} · {g.day} {g.time}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {results.events.length ? (
            <>
              <SectionHeading label="Events" />
              <ul className="px-5">
                {results.events.map((e) => (
                  <li key={e.id} className="hairline-y py-2.5 text-[14px]">
                    <Link to="/events/$eventId" params={{ eventId: e.id }}>
                      <span className="font-semibold">{e.title}</span>{" "}
                      <span className="text-muted-foreground">
                        · {e.dayLabel} {e.time}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      ) : (
        <>
          <SectionHeading label="Featured this quarter" />
          <div className="no-scrollbar flex gap-3 overflow-x-auto px-5">
            {featured.map((c) => (
              <Link
                key={c.id}
                to="/clubs/$clubId"
                params={{ clubId: c.id }}
                className="press w-[190px] shrink-0 rounded-3xl bg-surface p-4 shadow-soft"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-accent-soft text-xl">
                  {c.emoji}
                </span>
                <p className="mt-3 font-semibold">{c.name}</p>
                <p className="mt-1 text-[12.5px] leading-snug text-muted-foreground">{c.short}</p>
                <p className="mt-3 text-[11.5px] font-semibold text-primary">
                  {c.meeting.day.replace("Every ", "")} · {c.meeting.time.split(" – ")[0]}
                </p>
              </Link>
            ))}
          </div>

          <SectionHeading label="Following" />
          <div className="divide-y divide-hairline">
            {followed.map((c) => (
              <ClubRow key={c.id} club={c} following />
            ))}
          </div>

          <SectionHeading label="Explore all clubs" />
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-2">
            <Chip active={category === null} onClick={() => setCategory(null)}>
              All
            </Chip>
            {CLUB_CATEGORIES.map((c) => (
              <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
                {c}
              </Chip>
            ))}
          </div>
          <div className="divide-y divide-hairline">
            {filtered.map((c) => (
              <ClubRow key={c.id} club={c} following={state.followedClubs.includes(c.id)} />
            ))}
          </div>
        </>
      )}
    </Screen>
  );
}
