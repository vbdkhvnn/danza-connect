import { createFileRoute, notFound } from "@tanstack/react-router";
import { Clock, MapPin, Users } from "lucide-react";
import { DetailHeader, Disclaimer, Phone } from "@/components/app-shell";
import { Avatar, Meta, MetaRow, PrimaryButton } from "@/components/pieces";
import { useApp } from "@/lib/app-state";

export const Route = createFileRoute("/study/$groupId")({
  head: () => ({
    meta: [
      { title: "Study group — DAnza" },
      {
        name: "description",
        content:
          "Study group details: course, meeting time, campus location, who's going, and open spots.",
      },
      { property: "og:title", content: "Study group — DAnza" },
      {
        property: "og:description",
        content: "See the time, place, and members of this De Anza study group.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudyGroupDetail,
});

const TINTS = ["tint-blue", "tint-green", "tint-gold", "tint-plum", "tint-teal"];

function StudyGroupDetail() {
  const { groupId } = Route.useParams();
  const { state, toggleGroup } = useApp();
  const group = state.groups.find((g) => g.id === groupId);
  if (!group) throw notFound();

  const joined = state.joinedGroups.includes(group.id);
  const pct = Math.round((group.joined / group.capacity) * 100);

  return (
    <Phone>
      <div className="min-h-screen pb-10">
        <DetailHeader title={group.course} />
        <div className="px-5">
          <span className="rounded-lg bg-primary-soft px-2 py-1 text-[11px] font-bold text-primary">
            {group.mode}
          </span>
          <h1 className="mt-3 text-[26px] leading-tight font-semibold">{group.name}</h1>
          <MetaRow>
            <Meta icon={Clock}>
              {group.dayLabel} · {group.time} – {group.endTime}
            </Meta>
            <Meta icon={MapPin}>{group.location}</Meta>
          </MetaRow>

          <p className="mt-4 text-[14.5px] leading-relaxed text-foreground/85">
            {group.description}
          </p>

          <div className="mt-6 rounded-3xl bg-surface p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Members</p>
              <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-muted-foreground">
                <Users className="size-3.5" />
                {group.joined}/{group.capacity} joined
              </span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-4 flex -space-x-2">
              {group.members.map((m, i) => (
                <span key={m + i} className="rounded-full ring-2 ring-surface">
                  <Avatar initials={m} size="sm" tint={TINTS[i % TINTS.length] ?? "tint-plum"} />
                </span>
              ))}
            </div>
            <p className="mt-3 text-[12.5px] text-muted-foreground">
              Hosted by {group.hostName}
            </p>
          </div>

          <div className="mt-6">
            <PrimaryButton
              onClick={() => toggleGroup(group.id, "study_group_detail")}
              className={joined ? "bg-secondary text-secondary-foreground" : ""}
            >
              {joined ? "Joined · Leave group" : "Join group"}
            </PrimaryButton>
          </div>
        </div>
        <Disclaimer className="mt-8" />
      </div>
    </Phone>
  );
}
