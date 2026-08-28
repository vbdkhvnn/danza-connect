import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { AppHeader, Disclaimer, Screen, SectionHeading } from "@/components/app-shell";
import { Avatar, Chip, Field, PrimaryButton, Tag, inputClass } from "@/components/pieces";
import { INTERESTS, MAJORS, clubs } from "@/data/mock";
import { useApp } from "@/lib/app-state";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your profile — DAnza" },
      {
        name: "description",
        content:
          "Your DAnza profile: major, courses this quarter, clubs you follow, study groups you joined, and interests.",
      },
      { property: "og:title", content: "Your profile — DAnza" },
      {
        property: "og:description",
        content: "Manage your courses, clubs, interests, and study groups.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfileScreen,
});

function ProfileScreen() {
  const { state, updateProfile, logout } = useApp();
  const { profile, courses, followedClubs, joinedGroups, quarter, archivedCourses } = state;
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const myClubs = clubs.filter((c) => followedClubs.includes(c.id));

  return (
    <Screen tab="profile">
      <AppHeader title="Profile" subtitle={quarter} />

      <div className="mx-5 rounded-3xl bg-surface p-5 shadow-soft">
        <div className="flex items-center gap-4">
          <Avatar initials={`${profile.firstName[0] ?? ""}${profile.lastName[0] ?? ""}`} size="xl" />
          <div className="min-w-0">
            <p className="text-[19px] leading-tight font-semibold">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="text-[13px] text-muted-foreground">@{profile.username}</p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              {profile.major} · {profile.year}
            </p>
          </div>
        </div>
        <p className="mt-4 text-[14px] leading-relaxed text-foreground/85">{profile.bio}</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            ["Courses", courses.length],
            ["Clubs", myClubs.length],
            ["Groups", joinedGroups.length],
          ].map(([label, n]) => (
            <div key={String(label)} className="rounded-2xl bg-secondary py-2.5">
              <p className="text-[17px] font-semibold">{n}</p>
              <p className="text-[11.5px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setEditing((e) => !e)}
          className="press mt-4 w-full rounded-2xl bg-secondary py-2.5 text-[14px] font-semibold"
        >
          {editing ? "Done editing" : "Edit profile"}
        </button>
      </div>

      {editing ? (
        <div className="mx-5 mt-3 space-y-3 rounded-3xl bg-surface p-4 shadow-soft">
          <Field label="Bio">
            <textarea
              className={inputClass}
              value={profile.bio}
              onChange={(e) => updateProfile({ bio: e.target.value })}
            />
          </Field>
          <Field label="Major">
            <select
              className={inputClass}
              value={profile.major}
              onChange={(e) => updateProfile({ major: e.target.value })}
            >
              {MAJORS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Interests">
            <div className="flex flex-wrap gap-2 pt-1">
              {INTERESTS.map((i) => {
                const on = profile.interests.includes(i);
                return (
                  <Chip
                    key={i}
                    active={on}
                    onClick={() =>
                      updateProfile({
                        interests: on
                          ? profile.interests.filter((x) => x !== i)
                          : [...profile.interests, i],
                      })
                    }
                  >
                    {i}
                  </Chip>
                );
              })}
            </div>
          </Field>
        </div>
      ) : null}

      <SectionHeading label={`Courses · ${quarter}`} action="Edit" to="/onboarding" />
      <div className="flex flex-wrap gap-2 px-5">
        {courses.map((c) => (
          <span key={c} className="rounded-xl bg-primary-soft px-3 py-1.5 text-[12.5px] font-bold text-primary">
            {c}
          </span>
        ))}
      </div>

      {Object.entries(archivedCourses).map(([q, list]) => (
        <div key={q}>
          <SectionHeading label={`Archive · ${q}`} />
          <div className="flex flex-wrap gap-2 px-5">
            {list.map((c) => (
              <span key={c} className="rounded-xl bg-secondary px-3 py-1.5 text-[12.5px] font-semibold text-muted-foreground">
                {c}
              </span>
            ))}
          </div>
        </div>
      ))}

      <SectionHeading label="Clubs you follow" action="Directory" to="/clubs" />
      <ul className="space-y-2 px-5">
        {myClubs.map((c) => (
          <li key={c.id} className="flex items-center gap-3 rounded-2xl bg-surface p-3 shadow-soft">
            <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-lg">
              {c.emoji}
            </span>
            <span className="min-w-0 flex-1 truncate text-[14px] font-semibold">{c.name}</span>
            <Tag label={c.category} />
          </li>
        ))}
      </ul>

      <SectionHeading label="Interests" />
      <div className="flex flex-wrap gap-2 px-5">
        {profile.interests.map((i) => (
          <span key={i} className="rounded-full bg-secondary px-3 py-1.5 text-[12.5px] font-semibold">
            {i}
          </span>
        ))}
      </div>

      <div className="mt-8 px-5">
        <PrimaryButton
          className="bg-secondary text-secondary-foreground"
          onClick={() => {
            logout();
            navigate({ to: "/" });
          }}
        >
          <LogOut className="mr-2 inline size-4" />
          Log out
        </PrimaryButton>
      </div>

      <Disclaimer className="mt-6 mb-2" />
    </Screen>
  );
}
