import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { AppHeader, Disclaimer, Screen } from "@/components/app-shell";
import { Avatar, Chip, PrimaryButton, Tag, inputClass } from "@/components/pieces";
import { useApp } from "@/lib/app-state";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/social")({
  head: () => ({
    meta: [
      { title: "Campus feed — DAnza" },
      {
        name: "description",
        content:
          "A student-only feed for pickup games, study buddies, rides, and everything happening around De Anza right now.",
      },
      { property: "og:title", content: "Campus feed — DAnza" },
      {
        property: "og:description",
        content: "Post, reply, and find people to do things with on campus today.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SocialScreen,
});

const FILTERS = ["Following", "All students", "Saved"] as const;

function SocialScreen() {
  const { state, addPost, toggleLike, toggleSavePost } = useApp();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Following");
  const [draft, setDraft] = useState("");

  const posts = state.feed.filter((p) => {
    if (filter === "Following") return p.following !== false;
    if (filter === "Saved") return state.savedPosts.includes(p.id);
    return true;
  });

  return (
    <Screen tab="social">
      <AppHeader title="Social" subtitle="What students are posting today" />

      <div className="mx-5 rounded-3xl bg-surface p-4 shadow-soft">
        <div className="flex gap-3">
          <Avatar initials="MC" size="md" />
          <textarea
            className={cn(inputClass, "min-h-[52px] resize-none")}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Looking for people to…"
          />
        </div>
        <div className="mt-3">
          <PrimaryButton
            disabled={!draft.trim()}
            onClick={() => {
              addPost(draft.trim());
              setDraft("");
            }}
          >
            Post to campus
          </PrimaryButton>
        </div>
      </div>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto px-5">
        {FILTERS.map((f) => (
          <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f}
          </Chip>
        ))}
      </div>

      <ul className="mt-2 divide-y divide-hairline">
        {posts.map((p) => {
          const liked = state.likedPosts.includes(p.id);
          const saved = state.savedPosts.includes(p.id);
          return (
            <li key={p.id} className="px-5 py-4">
              <div className="flex gap-3">
                <Avatar initials={p.initials} size="md" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-[14px] font-semibold">{p.author}</span>
                    <span className="text-[11.5px] text-muted-foreground">
                      @{p.handle} · {p.ago}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-muted-foreground">{p.major}</p>
                  <p className="mt-2 text-[14.5px] leading-relaxed">{p.body}</p>
                  {p.tag ? (
                    <div className="mt-2">
                      <Tag label={p.tag} />
                    </div>
                  ) : null}
                  {p.image ? (
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      className="mt-3 h-[180px] w-full rounded-2xl object-cover"
                    />
                  ) : null}
                  <div className="mt-3 flex items-center gap-5 text-muted-foreground">
                    <button
                      type="button"
                      onClick={() => toggleLike(p.id)}
                      className={cn(
                        "press inline-flex items-center gap-1.5 text-[12.5px] font-semibold",
                        liked && "text-primary",
                      )}
                      aria-label="Like"
                    >
                      <Heart className={cn("size-4", liked && "fill-current")} />
                      {p.likes + (liked ? 1 : 0)}
                    </button>
                    <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold">
                      <MessageCircle className="size-4" />
                      {p.comments}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleSavePost(p.id)}
                      className={cn("press ml-auto", saved && "text-primary")}
                      aria-label="Save post"
                    >
                      <Bookmark className={cn("size-4", saved && "fill-current")} />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {posts.length === 0 ? (
        <p className="px-5 py-8 text-center text-[13.5px] text-muted-foreground">
          Nothing here yet.
        </p>
      ) : null}

      <Disclaimer className="mt-8 mb-2" />
    </Screen>
  );
}
