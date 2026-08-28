import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { DetailHeader, Disclaimer, Phone } from "@/components/app-shell";
import { notifications } from "@/data/mock";
import { useApp } from "@/lib/app-state";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — DAnza" },
      {
        name: "description",
        content:
          "Club meeting reminders, new study groups in your courses, event updates, and replies to your posts.",
      },
      { property: "og:title", content: "Notifications — DAnza" },
      {
        property: "og:description",
        content: "Reminders for club meetings, study groups, and campus events.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NotificationsScreen,
});

function NotificationsScreen() {
  const { state, markNotificationsRead } = useApp();

  useEffect(() => {
    const t = setTimeout(markNotificationsRead, 900);
    return () => clearTimeout(t);
  }, [markNotificationsRead]);

  return (
    <Phone>
      <div className="min-h-screen pb-10">
        <DetailHeader title="Notifications" />
        <ul className="divide-y divide-hairline">
          {notifications.map((n) => {
            const unread = Boolean(n.unread) && !state.readNotifications.includes(n.id);
            const row = (
              <span className="flex gap-3 px-5 py-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-secondary text-lg">
                  {n.emoji}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-[14px] leading-snug",
                        unread ? "font-semibold" : "font-medium text-foreground/80",
                      )}
                    >
                      {n.title}
                    </span>
                    {unread ? <span className="size-1.5 rounded-full bg-primary" /> : null}
                  </span>
                  <span className="mt-0.5 block text-[12.5px] text-muted-foreground">
                    {n.body} · {n.ago}
                  </span>
                </span>
              </span>
            );
            return (
              <li key={n.id}>
                {n.to ? (
                  <Link to={n.to as never} className="press block active:bg-secondary/60">
                    {row}
                  </Link>
                ) : (
                  row
                )}
              </li>
            );
          })}
        </ul>
        <Disclaimer className="mt-8" />
      </div>
    </Phone>
  );
}
