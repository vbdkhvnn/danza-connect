import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Disclaimer, Phone, Wordmark } from "@/components/app-shell";
import { Field, PrimaryButton, inputClass } from "@/components/pieces";
import { ALLOWED_EMAIL_DOMAINS } from "@/data/mock";
import { useApp } from "@/lib/app-state";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DAnza — Campus life for De Anza students" },
      {
        name: "description",
        content:
          "DAnza is a student-built app for finding De Anza clubs, weekly meetings, campus events, and study groups in one place.",
      },
      { property: "og:title", content: "DAnza — Campus life for De Anza students" },
      {
        property: "og:description",
        content: "Clubs, events, study groups, and campus happenings in one student-built app.",
      },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  const [mode, setMode] = useState<"welcome" | "login" | "signup" | "forgot">("welcome");
  const [email, setEmail] = useState("maya.chen@fhda.edu");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { track } = useApp();

  const domainOk = ALLOWED_EMAIL_DOMAINS.some((d) => email.trim().toLowerCase().endsWith(`@${d}`));

  return (
    <Phone className="bg-background">
      <div className="flex min-h-screen flex-col px-6 pt-16 pb-10">
        <div className="flex-1">
          <Wordmark className="text-4xl" />
          <h1 className="mt-6 text-[34px] leading-[1.08] font-semibold">
            Everything happening
            <br />
            at De Anza, today.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Club meetings, campus events, and study groups for your actual classes — without digging
            through five Instagram accounts.
          </p>

          <ul className="mt-8 space-y-3.5">
            {[
              ["🌙", "MSA meets at 1:30 today in Conference Room A"],
              ["📚", "MATH 1D study session at 5 in the library"],
              ["🎪", "Fall Club Fair is on the quad right now"],
            ].map(([emoji, text]) => (
              <li key={text} className="flex items-center gap-3 rounded-2xl bg-surface p-3 shadow-soft">
                <span className="grid size-9 place-items-center rounded-xl bg-accent-soft">
                  {emoji}
                </span>
                <span className="text-[13.5px] font-medium">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {mode === "welcome" ? (
          <div className="mt-10 space-y-3">
            <PrimaryButton
              onClick={() => {
                setMode("signup");
                track("app_opened", { source: "welcome" });
              }}
            >
              Create account
            </PrimaryButton>
            <button
              type="button"
              onClick={() => setMode("login")}
              className="press w-full rounded-2xl bg-secondary py-3.5 text-[15px] font-semibold"
            >
              I already have an account
            </button>
            <Disclaimer className="mt-4 px-0 text-center" />
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {mode === "login" ? "Log in" : mode === "signup" ? "Create account" : "Reset password"}
              </h2>
              <button
                type="button"
                onClick={() => setMode("welcome")}
                className="text-[13px] font-semibold text-muted-foreground"
              >
                Cancel
              </button>
            </div>

            <Field label="Student email" hint="Allowed domains: fhda.edu, deanza.edu (configurable)">
              <input
                className={inputClass}
                value={email}
                inputMode="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="you@fhda.edu"
              />
            </Field>

            {mode !== "forgot" ? (
              <Field label="Password">
                <input className={inputClass} type="password" defaultValue="••••••••" />
              </Field>
            ) : null}

            {error ? <p className="text-[12.5px] font-medium text-destructive">{error}</p> : null}

            <PrimaryButton
              onClick={() => {
                if (!domainOk) {
                  setError("Use your student email so we can verify you're at De Anza.");
                  return;
                }
                if (mode === "forgot") {
                  setError("");
                  setMode("login");
                  return;
                }
                track(mode === "signup" ? "signup_started" : "login", { source: "welcome" });
                navigate({ to: mode === "signup" ? "/onboarding" : "/home" });
              }}
            >
              {mode === "forgot" ? "Send reset link" : mode === "signup" ? "Verify student email" : "Log in"}
              <ArrowRight className="ml-2 inline size-4" />
            </PrimaryButton>

            {mode === "login" ? (
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="w-full text-center text-[13px] font-semibold text-primary"
              >
                Forgot password?
              </button>
            ) : null}

            <p className="pt-2 text-center text-[12px] text-muted-foreground">
              Prototype — <Link to="/home" className="font-semibold text-primary">skip to the app</Link>
            </p>
          </div>
        )}
      </div>
    </Phone>
  );
}
