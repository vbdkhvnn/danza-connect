import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { Phone, Wordmark } from "@/components/app-shell";
import { Chip, Field, PrimaryButton, inputClass } from "@/components/pieces";
import { COURSE_CATALOG, CURRENT_QUARTER, INTERESTS, MAJORS, clubs } from "@/data/mock";
import { useApp } from "@/lib/app-state";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Set up your DAnza profile" },
      {
        name: "description",
        content: "A two-minute setup: verify your student email, pick your courses, interests, and clubs.",
      },
      { property: "og:title", content: "Set up your DAnza profile" },
      {
        property: "og:description",
        content: "Verify your student email, pick your courses, interests, and clubs.",
      },
    ],
  }),
  component: Onboarding,
});

const STEPS = ["Verify", "You", "Courses", "Interests", "Clubs"] as const;

function Onboarding() {
  const navigate = useNavigate();
  const { state, completeOnboarding, toggleClub, track } = useApp();
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState(state.profile.firstName);
  const [username, setUsername] = useState(state.profile.username);
  const [major, setMajor] = useState(state.profile.major);
  const [year, setYear] = useState(state.profile.year);
  const [courses, setCourses] = useState<string[]>(state.courses);
  const [interests, setInterests] = useState<string[]>(state.profile.interests);
  const [query, setQuery] = useState("");

  const next = () => {
    if (step === STEPS.length - 1) {
      completeOnboarding({ firstName, username, major, year, interests, courses });
      track("onboarding_completed", { source: "onboarding" });
      navigate({ to: "/home" });
      return;
    }
    setStep((s) => s + 1);
  };

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const filteredCourses = COURSE_CATALOG.filter(
    (c) =>
      !query ||
      c.code.toLowerCase().includes(query.toLowerCase()) ||
      c.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Phone>
      <div className="flex min-h-screen flex-col px-5 pt-6 pb-8">
        <div className="flex items-center justify-between">
          <Wordmark className="text-xl" />
          <span className="text-[12px] font-semibold text-muted-foreground">
            Step {step + 1} of {STEPS.length}
          </span>
        </div>
        <div className="mt-4 flex gap-1.5">
          {STEPS.map((s, i) => (
            <span
              key={s}
              className={cn(
                "h-1 flex-1 rounded-full",
                i <= step ? "bg-primary" : "bg-secondary",
              )}
            />
          ))}
        </div>

        <div className="mt-8 flex-1">
          {step === 0 && (
            <div>
              <h1 className="text-[26px] leading-tight font-semibold">Check your email</h1>
              <p className="mt-2 text-[15px] text-muted-foreground">
                We sent a 6-digit code to{" "}
                <span className="font-semibold text-foreground">{state.profile.email}</span>. Student
                email verification keeps DAnza limited to De Anza students.
              </p>
              <div className="mt-8 flex justify-center gap-2">
                {["4", "1", "9", "2", "0", "7"].map((d, i) => (
                  <span
                    key={i}
                    className="grid size-12 place-items-center rounded-xl bg-surface text-xl font-semibold shadow-soft"
                  >
                    {d}
                  </span>
                ))}
              </div>
              <p className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-primary">
                <Mail className="size-4" /> Resend code
              </p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h1 className="text-[26px] leading-tight font-semibold">Who are you?</h1>
              <Field label="First name">
                <input className={inputClass} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </Field>
              <Field label="Username" hint="Optional — how classmates find you">
                <input className={inputClass} value={username} onChange={(e) => setUsername(e.target.value)} />
              </Field>
              <Field label="Major">
                <div className="mt-1 flex flex-wrap gap-2">
                  {MAJORS.map((m) => (
                    <Chip key={m} active={major === m} onClick={() => setMajor(m)}>
                      {m}
                    </Chip>
                  ))}
                </div>
              </Field>
              <Field label="Year" hint="Optional">
                <div className="mt-1 flex flex-wrap gap-2">
                  {["1st year", "2nd year", "3rd year+", "Returning"].map((y) => (
                    <Chip key={y} active={year === y} onClick={() => setYear(y)}>
                      {y}
                    </Chip>
                  ))}
                </div>
              </Field>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="text-[26px] leading-tight font-semibold">
                What are you taking this quarter?
              </h1>
              <p className="mt-2 text-[14px] text-muted-foreground">
                {CURRENT_QUARTER} · we use this to surface study groups for your classes.
              </p>
              <input
                className={cn(inputClass, "mt-4")}
                placeholder="Search courses (e.g. MATH, physics)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <ul className="mt-3 space-y-1.5">
                {filteredCourses.map((c) => {
                  const on = courses.includes(c.code);
                  return (
                    <li key={c.code}>
                      <button
                        type="button"
                        onClick={() => toggle(courses, setCourses, c.code)}
                        className={cn(
                          "press flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left",
                          on ? "bg-primary-soft" : "bg-surface shadow-soft",
                        )}
                      >
                        <span className="flex-1">
                          <span className="block text-[14.5px] font-semibold">{c.code}</span>
                          <span className="block text-[12px] text-muted-foreground">{c.title}</span>
                        </span>
                        {on ? <Check className="size-4 text-primary" /> : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {step === 3 && (
            <div>
              <h1 className="text-[26px] leading-tight font-semibold">What are you into?</h1>
              <p className="mt-2 text-[14px] text-muted-foreground">
                Helps you find students doing the same things around campus.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {INTERESTS.map((i) => (
                  <Chip
                    key={i}
                    active={interests.includes(i)}
                    onClick={() => toggle(interests, setInterests, i)}
                  >
                    {i}
                  </Chip>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h1 className="text-[26px] leading-tight font-semibold">Follow a few clubs</h1>
              <p className="mt-2 text-[14px] text-muted-foreground">
                You'll get their weekly meeting reminders and announcements.
              </p>
              <ul className="mt-5 space-y-1.5">
                {clubs.slice(0, 7).map((club) => {
                  const on = state.followedClubs.includes(club.id);
                  return (
                    <li key={club.id}>
                      <button
                        type="button"
                        onClick={() => toggleClub(club.id, "onboarding")}
                        className="press flex w-full items-center gap-3 rounded-2xl bg-surface px-3.5 py-3 text-left shadow-soft"
                      >
                        <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-lg">
                          {club.emoji}
                        </span>
                        <span className="flex-1">
                          <span className="block text-[14.5px] font-semibold">{club.name}</span>
                          <span className="block text-[12px] text-muted-foreground">{club.short}</span>
                        </span>
                        <span
                          className={cn(
                            "rounded-full px-3 py-1.5 text-[12px] font-bold",
                            on ? "bg-primary text-primary-foreground" : "bg-secondary",
                          )}
                        >
                          {on ? "Following" : "Follow"}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-8 space-y-2">
          <PrimaryButton onClick={next}>
            {step === STEPS.length - 1 ? "Enter DAnza" : "Continue"}
          </PrimaryButton>
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="w-full text-center text-[13px] font-semibold text-muted-foreground"
            >
              Back
            </button>
          ) : null}
        </div>
      </div>
    </Phone>
  );
}
