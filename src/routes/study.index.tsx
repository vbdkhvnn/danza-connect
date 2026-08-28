import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";
import { AppHeader, Disclaimer, Screen, SectionHeading } from "@/components/app-shell";
import { Chip, Field, PrimaryButton, StudyGroupCard, inputClass } from "@/components/pieces";
import { CAMPUS_LOCATIONS, COURSE_CATALOG } from "@/data/mock";
import { useApp } from "@/lib/app-state";

export const Route = createFileRoute("/study/")({
  head: () => ({
    meta: [
      { title: "Study groups — DAnza" },
      {
        name: "description",
        content:
          "Find or create study groups for your De Anza courses — see who's going, where they meet, and join in one tap.",
      },
      { property: "og:title", content: "Study groups — DAnza" },
      {
        property: "og:description",
        content: "Course-based study groups with times, locations, and open spots.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudyScreen,
});

function StudyScreen() {
  const { state, toggleGroup, addGroup } = useApp();
  const { courses, joinedGroups, groups } = state;
  const [filter, setFilter] = useState<string>("My courses");
  const [creating, setCreating] = useState(false);

  const filters = useMemo(() => ["My courses", "All", ...courses], [courses]);

  const visible = groups.filter((g) => {
    if (filter === "All") return true;
    if (filter === "My courses") return courses.includes(g.course);
    return g.course === filter;
  });

  const mine = groups.filter((g) => joinedGroups.includes(g.id));

  return (
    <Screen tab="study">
      <AppHeader
        title="Study"
        subtitle={`${mine.length} groups joined · ${courses.length} courses this quarter`}
      />

      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-2">
        {filters.map((f) => (
          <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f}
          </Chip>
        ))}
      </div>

      <div className="px-5 pt-1 pb-2">
        <button
          type="button"
          onClick={() => setCreating((c) => !c)}
          className="press flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-input py-3 text-[14px] font-semibold text-primary"
        >
          {creating ? <X className="size-4" /> : <Plus className="size-4" />}
          {creating ? "Cancel" : "Create a study group"}
        </button>
      </div>

      {creating ? <CreateForm onDone={() => setCreating(false)} addGroup={addGroup} /> : null}

      {mine.length ? (
        <>
          <SectionHeading label="Your groups" />
          <div className="space-y-3">
            {mine.map((g) => (
              <StudyGroupCard key={g.id} group={g} joined onJoin={() => toggleGroup(g.id, "study")} />
            ))}
          </div>
        </>
      ) : null}

      <SectionHeading label={filter === "All" ? "All study groups" : filter} />
      <div className="space-y-3">
        {visible.length ? (
          visible.map((g) => (
            <StudyGroupCard
              key={g.id}
              group={g}
              joined={joinedGroups.includes(g.id)}
              onJoin={() => toggleGroup(g.id, "study")}
            />
          ))
        ) : (
          <p className="px-5 text-[13.5px] text-muted-foreground">
            No groups yet for this course. Create the first one.
          </p>
        )}
      </div>

      <Disclaimer className="mt-8 mb-2" />
    </Screen>
  );
}

function CreateForm({
  onDone,
  addGroup,
}: {
  onDone: () => void;
  addGroup: ReturnType<typeof useApp>["addGroup"];
}) {
  const [course, setCourse] = useState(COURSE_CATALOG[0]?.code ?? "MATH 1D");
  const [name, setName] = useState("");
  const [location, setLocation] = useState(CAMPUS_LOCATIONS[0] ?? "Library, 2nd floor");
  const [time, setTime] = useState("5:00 PM");

  return (
    <div className="mx-5 mb-2 space-y-3 rounded-3xl bg-surface p-4 shadow-soft">
      <Field label="Course">
        <select className={inputClass} value={course} onChange={(e) => setCourse(e.target.value)}>
          {COURSE_CATALOG.map((c) => (
            <option key={c.code} value={c.code}>
              {c.code} — {c.title}
            </option>
          ))}
        </select>
      </Field>
      <Field label="What are you studying?">
        <input
          className={inputClass}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Midterm review session"
        />
      </Field>
      <Field label="Where">
        <select
          className={inputClass}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          {CAMPUS_LOCATIONS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Start time">
        <input className={inputClass} value={time} onChange={(e) => setTime(e.target.value)} />
      </Field>
      <PrimaryButton
        disabled={!name.trim()}
        onClick={() => {
          addGroup({
            course,
            name: name.trim(),
            description: "Created from the Study tab.",
            day: "Today",
            dayLabel: "Thu, Aug 27",
            time,
            endTime: "—",
            location,
            mode: location.includes("Online") ? "Online" : "In person",
            capacity: 8,
            hostName: "You",
            hostInitials: "MC",
          });
          onDone();
        }}
      >
        Create group
      </PrimaryButton>
    </div>
  );
}
