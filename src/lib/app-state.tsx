import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CURRENT_QUARTER,
  posts as seedPosts,
  studyGroups as seedGroups,
  notifications as seedNotifications,
  type Post,
  type StudyGroup,
} from "@/data/mock";

/**
 * Prototype state. Mirrors the shape the production app would keep in
 * Supabase so the logic can be ported to React Native with minimal change.
 */

export type AnalyticsEvent = {
  name: string;
  props: Record<string, string | number | undefined>;
  at: number;
};

export type Profile = {
  firstName: string;
  lastName: string;
  username: string;
  major: string;
  year: string;
  bio: string;
  interests: string[];
  email: string;
};

type State = {
  onboarded: boolean;
  profile: Profile;
  quarter: string;
  courses: string[];
  archivedCourses: Record<string, string[]>;
  followedClubs: string[];
  joinedGroups: string[];
  rsvps: Record<string, "going" | "interested">;
  savedEvents: string[];
  likedPosts: string[];
  savedPosts: string[];
  groups: StudyGroup[];
  feed: Post[];
  readNotifications: string[];
  analytics: AnalyticsEvent[];
};

const initialState: State = {
  onboarded: false,
  profile: {
    firstName: "Maya",
    lastName: "Chen",
    username: "mayac",
    major: "Computer Science",
    year: "2nd year",
    bio: "Transferring for CS. Usually in the library or on the courts.",
    interests: ["Coding", "Basketball", "Coffee", "Photography"],
    email: "maya.chen@fhda.edu",
  },
  quarter: CURRENT_QUARTER,
  courses: ["MATH 1D", "PHYS 4B", "CIS 22B", "ENGL 1A"],
  archivedCourses: { "Spring 2026": ["MATH 1C", "PHYS 4A", "CIS 22A"] },
  followedClubs: ["programming", "msa", "hoops"],
  joinedGroups: ["sg2"],
  rsvps: { "club-fair": "going" },
  savedEvents: ["cultural-fest"],
  likedPosts: ["p3"],
  savedPosts: [],
  groups: seedGroups,
  feed: seedPosts,
  readNotifications: [],
  analytics: [],
};

type Ctx = {
  state: State;
  track: (name: string, props?: Record<string, string | number | undefined>) => void;
  completeOnboarding: (patch: Partial<Profile> & { courses?: string[] }) => void;
  updateProfile: (patch: Partial<Profile>) => void;
  setCourses: (codes: string[]) => void;
  toggleClub: (id: string, source: string) => void;
  toggleGroup: (id: string, source: string) => void;
  setRsvp: (id: string, value: "going" | "interested") => void;
  toggleSaveEvent: (id: string) => void;
  toggleLike: (id: string) => void;
  toggleSavePost: (id: string) => void;
  addPost: (body: string, tag?: string) => void;
  addGroup: (g: Omit<StudyGroup, "id" | "joined" | "members">) => string;
  markNotificationsRead: () => void;
  logout: () => void;
  unreadCount: number;
};

const AppContext = createContext<Ctx | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initialState);

  const track: Ctx["track"] = useCallback((name, props = {}) => {
    setState((s) => ({
      ...s,
      analytics: [
        ...s.analytics.slice(-80),
        { name, props: { user_id: "u_anon_8412", ...props }, at: Date.now() },
      ],
    }));
  }, []);

  const value = useMemo<Ctx>(() => {
    const unreadCount = seedNotifications.filter(
      (n) => n.unread && !state.readNotifications.includes(n.id),
    ).length;

    return {
      state,
      track,
      unreadCount,
      completeOnboarding: (patch) =>
        setState((s) => ({
          ...s,
          onboarded: true,
          courses: patch.courses ?? s.courses,
          profile: { ...s.profile, ...patch },
        })),
      updateProfile: (patch) => setState((s) => ({ ...s, profile: { ...s.profile, ...patch } })),
      setCourses: (codes) => setState((s) => ({ ...s, courses: codes })),
      toggleClub: (id, source) => {
        const following = state.followedClubs.includes(id);
        track(following ? "club_unfollowed" : "club_followed", { club_id: id, source });
        setState((s) => ({
          ...s,
          followedClubs: following
            ? s.followedClubs.filter((c) => c !== id)
            : [...s.followedClubs, id],
        }));
      },
      toggleGroup: (id, source) => {
        const joined = state.joinedGroups.includes(id);
        track(joined ? "study_group_left" : "study_group_joined", { study_group_id: id, source });
        setState((s) => ({
          ...s,
          joinedGroups: joined ? s.joinedGroups.filter((g) => g !== id) : [...s.joinedGroups, id],
          groups: s.groups.map((g) =>
            g.id === id ? { ...g, joined: Math.max(0, g.joined + (joined ? -1 : 1)) } : g,
          ),
        }));
      },
      setRsvp: (id, v) => {
        track("event_rsvped", { event_id: id, response: v });
        setState((s) => ({
          ...s,
          rsvps: s.rsvps[id] === v ? omit(s.rsvps, id) : { ...s.rsvps, [id]: v },
        }));
      },
      toggleSaveEvent: (id) => {
        track("event_saved", { event_id: id });
        setState((s) => ({
          ...s,
          savedEvents: s.savedEvents.includes(id)
            ? s.savedEvents.filter((e) => e !== id)
            : [...s.savedEvents, id],
        }));
      },
      toggleLike: (id) =>
        setState((s) => ({
          ...s,
          likedPosts: s.likedPosts.includes(id)
            ? s.likedPosts.filter((p) => p !== id)
            : [...s.likedPosts, id],
        })),
      toggleSavePost: (id) =>
        setState((s) => ({
          ...s,
          savedPosts: s.savedPosts.includes(id)
            ? s.savedPosts.filter((p) => p !== id)
            : [...s.savedPosts, id],
        })),
      addPost: (body, tag) => {
        track("social_post_created", { source: "social_feed" });
        setState((s) => ({
          ...s,
          feed: [
            {
              id: `p${Date.now()}`,
              author: `${s.profile.firstName} ${s.profile.lastName}`,
              initials: `${s.profile.firstName[0] ?? "M"}${s.profile.lastName[0] ?? "C"}`,
              handle: s.profile.username,
              major: s.profile.major,
              ago: "now",
              body,
              likes: 0,
              comments: 0,
              tag,
              following: true,
            },
            ...s.feed,
          ],
        }));
      },
      addGroup: (g) => {
        const id = `sg${Date.now()}`;
        track("study_group_created", { study_group_id: id, course_id: g.course });
        setState((s) => ({
          ...s,
          groups: [{ ...g, id, joined: 1, members: ["MC"] }, ...s.groups],
          joinedGroups: [...s.joinedGroups, id],
        }));
        return id;
      },
      markNotificationsRead: () =>
        setState((s) => ({ ...s, readNotifications: seedNotifications.map((n) => n.id) })),
      logout: () => setState({ ...initialState, onboarded: false }),
    };
  }, [state, track]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function omit<T extends Record<string, unknown>>(obj: T, key: string) {
  const next = { ...obj };
  delete next[key];
  return next;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppStateProvider");
  return ctx;
}
