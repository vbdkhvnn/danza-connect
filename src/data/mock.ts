import clubFair from "@/assets/event-clubfair.jpg";
import studyImg from "@/assets/event-study.jpg";
import culturalImg from "@/assets/event-cultural.jpg";
import basketballImg from "@/assets/event-basketball.jpg";

export const EVENT_IMAGES = {
  clubFair,
  study: studyImg,
  cultural: culturalImg,
  basketball: basketballImg,
};

export const ALLOWED_EMAIL_DOMAINS = ["fhda.edu", "deanza.edu"];

export const CURRENT_QUARTER = "Fall 2026";
export const QUARTERS = ["Fall 2026", "Winter 2027", "Spring 2027", "Summer 2027"];

export type ClubCategory =
  | "Academic"
  | "Cultural"
  | "Religious"
  | "Technology"
  | "Career"
  | "Arts"
  | "Sports"
  | "Social"
  | "Volunteer"
  | "Advocacy";

export const CLUB_CATEGORIES: ClubCategory[] = [
  "Academic",
  "Cultural",
  "Religious",
  "Technology",
  "Career",
  "Arts",
  "Sports",
  "Social",
  "Volunteer",
  "Advocacy",
];

export const CATEGORY_TINT: Record<string, string> = {
  Academic: "tint-blue",
  Cultural: "tint-plum",
  Religious: "tint-teal",
  Technology: "tint-blue",
  Career: "tint-gold",
  Arts: "tint-plum",
  Sports: "tint-green",
  Social: "tint-gold",
  Volunteer: "tint-green",
  Advocacy: "tint-teal",
};

export type Club = {
  id: string;
  name: string;
  short: string;
  emoji: string;
  category: ClubCategory;
  description: string;
  followers: number;
  meeting: { day: string; time: string; room: string };
  instagram?: string;
  discord?: string;
  email?: string;
  featured?: boolean;
  officer?: boolean;
};

export const clubs: Club[] = [
  {
    id: "programming",
    name: "Programming Club",
    short: "Build, ship, and learn together",
    emoji: "💻",
    category: "Technology",
    description:
      "Weekly build nights, interview prep, and hackathon teams. All levels welcome — bring a laptop or just bring curiosity.",
    followers: 412,
    meeting: { day: "Every Tuesday", time: "1:30 PM – 2:30 PM", room: "Room L-47" },
    instagram: "@da.programming",
    discord: "discord.gg/da-prog",
    email: "programming.club@example.org",
    featured: true,
    officer: true,
  },
  {
    id: "msa",
    name: "MSA",
    short: "Muslim Student Association",
    emoji: "🌙",
    category: "Religious",
    description:
      "A home base on campus for community, weekly halaqas, jummah logistics, and a lot of shared food.",
    followers: 318,
    meeting: { day: "Every Wednesday", time: "1:30 PM – 2:30 PM", room: "Conference Room A" },
    instagram: "@da.msa",
    email: "msa@example.org",
    featured: true,
  },
  {
    id: "physics",
    name: "Physics Club",
    short: "Problem sets, demos, and telescope nights",
    emoji: "🔭",
    category: "Academic",
    description:
      "Group problem-solving for the 4-series, guest talks, and a stargazing night once a quarter.",
    followers: 176,
    meeting: { day: "Every Thursday", time: "3:00 PM – 4:00 PM", room: "Room S-11" },
    instagram: "@da.physics",
    featured: true,
  },
  {
    id: "hoops",
    name: "Hoops Collective",
    short: "Pickup basketball, open to everyone",
    emoji: "🏀",
    category: "Sports",
    description: "Casual runs after class, no tryouts, no commitment. Just show up and play.",
    followers: 241,
    meeting: { day: "Every Monday", time: "4:00 PM – 6:00 PM", room: "Outdoor Courts" },
    instagram: "@da.hoops",
  },
  {
    id: "film",
    name: "Film & Photo Society",
    short: "Shoot, edit, screen",
    emoji: "🎬",
    category: "Arts",
    description: "Monthly screenings, photo walks around campus, and a student short film each spring.",
    followers: 154,
    meeting: { day: "Every Friday", time: "12:00 PM – 1:00 PM", room: "Room A-81" },
    instagram: "@da.filmsociety",
  },
  {
    id: "business",
    name: "Business & Careers",
    short: "Resumes, internships, transfer prep",
    emoji: "📈",
    category: "Career",
    description: "Mock interviews, resume clinics, and alumni panels from transfer students.",
    followers: 203,
    meeting: { day: "Every Tuesday", time: "11:00 AM – 12:00 PM", room: "Room E-34" },
    email: "careers.club@example.org",
  },
  {
    id: "cultural",
    name: "Cultural Alliance",
    short: "Celebrating campus cultures",
    emoji: "🌍",
    category: "Cultural",
    description: "Food nights, language exchanges, and the annual Cultural Festival on the quad.",
    followers: 366,
    meeting: { day: "Every Wednesday", time: "3:30 PM – 4:30 PM", room: "Hinson Campus Center" },
    instagram: "@da.cultural",
  },
  {
    id: "green",
    name: "Green Campus",
    short: "Sustainability + volunteering",
    emoji: "🌱",
    category: "Volunteer",
    description: "Campus garden shifts, creek cleanups, and a zero-waste push in the cafeteria.",
    followers: 129,
    meeting: { day: "Every Thursday", time: "1:00 PM – 2:00 PM", room: "Campus Garden" },
  },
  {
    id: "psi",
    name: "Psychology Circle",
    short: "Research, grad school, and discussion",
    emoji: "🧠",
    category: "Academic",
    description: "Journal club, research assistant opportunities, and transfer application workshops.",
    followers: 98,
    meeting: { day: "Every Monday", time: "12:30 PM – 1:30 PM", room: "Room F-21" },
  },
  {
    id: "voices",
    name: "Student Voices",
    short: "Advocacy and student government prep",
    emoji: "📣",
    category: "Advocacy",
    description: "Campaigns on textbook costs, transit passes, and campus safety.",
    followers: 87,
    meeting: { day: "Every Friday", time: "2:00 PM – 3:00 PM", room: "Room L-12" },
  },
];

export type CampusEvent = {
  id: string;
  title: string;
  hostId?: string;
  host: string;
  category: string;
  image?: string;
  day: string;
  dayLabel: string;
  time: string;
  endTime: string;
  location: string;
  capacity?: number;
  going: number;
  description: string;
  today?: boolean;
};

export const events: CampusEvent[] = [
  {
    id: "club-fair",
    title: "Fall Club Fair",
    host: "Inter Club Council",
    category: "Campus",
    image: clubFair,
    day: "Today",
    dayLabel: "Thu, Aug 27",
    time: "11:00 AM",
    endTime: "2:00 PM",
    location: "Main Quad",
    going: 284,
    description:
      "Every club on campus in one place. Walk the quad, sign up for whatever looks fun, and grab free stickers and boba while it lasts.",
    today: true,
  },
  {
    id: "msa-weekly",
    title: "MSA Weekly Meeting",
    hostId: "msa",
    host: "MSA",
    category: "Club meeting",
    day: "Today",
    dayLabel: "Thu, Aug 27",
    time: "1:30 PM",
    endTime: "2:30 PM",
    location: "Conference Room A",
    going: 41,
    description: "Weekly halaqa and community check-in. Snacks provided, everyone welcome.",
    today: true,
  },
  {
    id: "hoops-run",
    title: "After-Class Pickup Run",
    hostId: "hoops",
    host: "Hoops Collective",
    category: "Sports",
    image: basketballImg,
    day: "Today",
    dayLabel: "Thu, Aug 27",
    time: "4:00 PM",
    endTime: "6:00 PM",
    location: "Outdoor Courts",
    capacity: 20,
    going: 12,
    description: "Casual 5s. Rotate in whenever. Bring water and a light/dark shirt.",
    today: true,
  },
  {
    id: "cultural-fest",
    title: "Cultural Festival Night",
    hostId: "cultural",
    host: "Cultural Alliance",
    category: "Cultural",
    image: culturalImg,
    day: "Friday",
    dayLabel: "Fri, Aug 28",
    time: "6:00 PM",
    endTime: "9:30 PM",
    location: "Hinson Campus Center",
    going: 196,
    description:
      "Food from a dozen student groups, live performances, and a photo wall. Bring friends, come hungry.",
  },
  {
    id: "prog-hack",
    title: "Mini Hack Night",
    hostId: "programming",
    host: "Programming Club",
    category: "Technology",
    day: "Friday",
    dayLabel: "Fri, Aug 28",
    time: "5:00 PM",
    endTime: "9:00 PM",
    location: "Room L-47",
    capacity: 40,
    going: 27,
    description: "Four hours, one small project, pizza at 7. Teams of two or three, beginners paired with mentors.",
  },
  {
    id: "transfer-panel",
    title: "Transfer Panel: CS + Engineering",
    hostId: "business",
    host: "Business & Careers",
    category: "Career",
    day: "Monday",
    dayLabel: "Mon, Aug 31",
    time: "12:00 PM",
    endTime: "1:15 PM",
    location: "Room E-34",
    going: 63,
    description: "Students who transferred to SJSU, Davis, and Cal Poly answer whatever you want to ask.",
  },
  {
    id: "creek-cleanup",
    title: "Stevens Creek Cleanup",
    hostId: "green",
    host: "Green Campus",
    category: "Volunteer",
    day: "Saturday",
    dayLabel: "Sat, Aug 29",
    time: "9:00 AM",
    endTime: "11:30 AM",
    location: "Meet at Lot B",
    capacity: 30,
    going: 18,
    description: "Gloves and bags provided. Counts toward volunteer hours if you need them.",
  },
];

export type Announcement = {
  id: string;
  clubId: string;
  club: string;
  emoji: string;
  body: string;
  ago: string;
};

export const announcements: Announcement[] = [
  {
    id: "a1",
    clubId: "msa",
    club: "MSA",
    emoji: "🌙",
    body: "Today's meeting moved to Conference Room A (L-47 is booked).",
    ago: "22m",
  },
  {
    id: "a2",
    clubId: "programming",
    club: "Programming Club",
    emoji: "💻",
    body: "Hack Night signups are open — 13 spots left, food included.",
    ago: "2h",
  },
  {
    id: "a3",
    clubId: "physics",
    club: "Physics Club",
    emoji: "🔭",
    body: "Free tutoring for the 4-series all week in S-11, drop in anytime.",
    ago: "5h",
  },
  {
    id: "a4",
    clubId: "cultural",
    club: "Cultural Alliance",
    emoji: "🌍",
    body: "Performer signups for Festival Night close tonight at 11:59.",
    ago: "1d",
  },
];

export const COURSE_CATALOG = [
  { code: "MATH 1D", title: "Calculus IV", dept: "Mathematics" },
  { code: "MATH 1C", title: "Calculus III", dept: "Mathematics" },
  { code: "PHYS 4B", title: "General Physics II", dept: "Physics" },
  { code: "PHYS 4A", title: "General Physics I", dept: "Physics" },
  { code: "CIS 22B", title: "Intermediate C++", dept: "Computer Info Systems" },
  { code: "CIS 22C", title: "Data Structures", dept: "Computer Info Systems" },
  { code: "ENGL 1A", title: "Composition & Reading", dept: "English" },
  { code: "ENGL 1B", title: "Reading & Analysis", dept: "English" },
  { code: "CHEM 1A", title: "General Chemistry I", dept: "Chemistry" },
  { code: "BIOL 40A", title: "Human Anatomy", dept: "Biology" },
  { code: "PSYC 1", title: "General Psychology", dept: "Psychology" },
  { code: "ECON 1", title: "Macroeconomics", dept: "Economics" },
  { code: "SPAN 1", title: "Elementary Spanish", dept: "Language" },
  { code: "ART 4A", title: "Drawing I", dept: "Art" },
];

export const CAMPUS_LOCATIONS = [
  "Library, 2nd floor",
  "Library Study Rooms",
  "Main Quad",
  "Hinson Campus Center",
  "Learning Center West",
  "Outdoor Courts",
  "Café Tables",
  "Online (Zoom)",
];

export type StudyGroup = {
  id: string;
  course: string;
  name: string;
  description: string;
  dayLabel: string;
  day: string;
  time: string;
  endTime: string;
  location: string;
  mode: "In person" | "Online" | "Hybrid";
  capacity: number;
  joined: number;
  hostName: string;
  hostInitials: string;
  members: string[];
};

export const studyGroups: StudyGroup[] = [
  {
    id: "sg1",
    course: "MATH 1D",
    name: "Midterm Study Session",
    description:
      "Working through the practice midterm and the vector calc problems from chapter 15. Bring your own paper.",
    day: "Today",
    dayLabel: "Thu, Aug 27",
    time: "5:00 PM",
    endTime: "7:00 PM",
    location: "Library, 2nd floor",
    mode: "In person",
    capacity: 8,
    joined: 4,
    hostName: "Priya R.",
    hostInitials: "PR",
    members: ["PR", "JL", "AM", "TN"],
  },
  {
    id: "sg2",
    course: "PHYS 4B",
    name: "Homework Session",
    description: "Weekly HW grind for problem set 4. We usually split the problems and compare answers.",
    day: "Tomorrow",
    dayLabel: "Fri, Aug 28",
    time: "2:00 PM",
    endTime: "4:00 PM",
    location: "Learning Center West",
    mode: "In person",
    capacity: 10,
    joined: 6,
    hostName: "Daniel K.",
    hostInitials: "DK",
    members: ["DK", "SR", "MO", "AB", "LT", "CV"],
  },
  {
    id: "sg3",
    course: "CIS 22B",
    name: "Pointers & Linked Lists",
    description: "Whiteboarding pointer diagrams before the lab quiz. Beginners very welcome.",
    day: "Tomorrow",
    dayLabel: "Fri, Aug 28",
    time: "11:00 AM",
    endTime: "12:30 PM",
    location: "Library Study Rooms",
    mode: "Hybrid",
    capacity: 6,
    joined: 3,
    hostName: "Alex T.",
    hostInitials: "AT",
    members: ["AT", "RM", "KP"],
  },
  {
    id: "sg4",
    course: "ENGL 1A",
    name: "Essay 2 Peer Review",
    description: "Bring a draft, leave with notes. We read in pairs then swap.",
    day: "Monday",
    dayLabel: "Mon, Aug 31",
    time: "1:00 PM",
    endTime: "2:30 PM",
    location: "Café Tables",
    mode: "In person",
    capacity: 8,
    joined: 5,
    hostName: "Maya C.",
    hostInitials: "MC",
    members: ["MC", "JD", "EO", "HS", "NV"],
  },
  {
    id: "sg5",
    course: "MATH 1D",
    name: "Weekly Problem Set Crew",
    description: "Every week, same table, same people. Drop in whenever.",
    day: "Saturday",
    dayLabel: "Sat, Aug 29",
    time: "10:00 AM",
    endTime: "12:00 PM",
    location: "Online (Zoom)",
    mode: "Online",
    capacity: 12,
    joined: 7,
    hostName: "Sam W.",
    hostInitials: "SW",
    members: ["SW", "GT", "IL", "OP", "QR", "UV", "WX"],
  },
  {
    id: "sg6",
    course: "CHEM 1A",
    name: "Stoichiometry Rescue",
    description: "Lab report help and a run through the tricky limiting reagent problems.",
    day: "Tuesday",
    dayLabel: "Tue, Sep 1",
    time: "3:00 PM",
    endTime: "4:30 PM",
    location: "Learning Center West",
    mode: "In person",
    capacity: 6,
    joined: 2,
    hostName: "Nora F.",
    hostInitials: "NF",
    members: ["NF", "BD"],
  },
];

export type Post = {
  id: string;
  author: string;
  initials: string;
  handle: string;
  major: string;
  ago: string;
  body: string;
  image?: string;
  likes: number;
  comments: number;
  tag?: string;
  following?: boolean;
};

export const posts: Post[] = [
  {
    id: "p1",
    author: "Jordan Lee",
    initials: "JL",
    handle: "jordanl",
    major: "Computer Science",
    ago: "12m",
    body: "Anyone playing basketball at the courts around 4? Need two more for full 5s 🏀",
    likes: 14,
    comments: 6,
    tag: "Sports",
    following: true,
  },
  {
    id: "p2",
    author: "Priya Rao",
    initials: "PR",
    handle: "priyar",
    major: "Applied Math",
    ago: "38m",
    body: "Looking for people in MATH 1D who want to actually study before the midterm. Made a group for 5pm at the library, a few spots left.",
    likes: 22,
    comments: 9,
    tag: "MATH 1D",
    following: true,
  },
  {
    id: "p3",
    author: "Omar Haddad",
    initials: "OH",
    handle: "omarh",
    major: "Business",
    ago: "1h",
    body: "Club Fair is way bigger than last quarter. Free boba line is on the north side, go now.",
    image: clubFair,
    likes: 57,
    comments: 12,
    tag: "Campus",
  },
  {
    id: "p4",
    author: "Sofia Marín",
    initials: "SM",
    handle: "sofiam",
    major: "Psychology",
    ago: "2h",
    body: "Who wants to grab food after my 12:30? I'm thinking the taco truck on Stevens Creek ☕️🌮",
    likes: 31,
    comments: 18,
    tag: "Food",
  },
  {
    id: "p5",
    author: "Daniel Kim",
    initials: "DK",
    handle: "danielk",
    major: "Physics",
    ago: "3h",
    body: "PHYS 4B people — problem set 4 #7 is a trap, the sign flips. You're welcome.",
    likes: 44,
    comments: 15,
    tag: "PHYS 4B",
    following: true,
  },
  {
    id: "p6",
    author: "Aisha Nur",
    initials: "AN",
    handle: "aishan",
    major: "Nursing",
    ago: "5h",
    body: "Anyone going to the cultural festival Friday night? Going with a few friends, easy to join us.",
    image: culturalImg,
    likes: 68,
    comments: 21,
    tag: "Events",
  },
];

export const INTERESTS = [
  "Coding",
  "Basketball",
  "Gaming",
  "Coffee",
  "Photography",
  "Hiking",
  "Music",
  "Art",
  "Cars",
  "Fitness",
  "Movies",
  "Food",
  "Volunteering",
  "Anime",
  "Soccer",
  "Reading",
];

export const MAJORS = [
  "Computer Science",
  "Applied Math",
  "Physics",
  "Biology",
  "Business",
  "Psychology",
  "Nursing",
  "Engineering",
  "Communications",
  "Art & Design",
  "Undeclared",
];

export type Notification = {
  id: string;
  kind: "club" | "study" | "event" | "social";
  emoji: string;
  title: string;
  body: string;
  ago: string;
  unread?: boolean;
  to?: string;
};

export const notifications: Notification[] = [
  {
    id: "n1",
    kind: "club",
    emoji: "🌙",
    title: "MSA meets in 1 hour",
    body: "Conference Room A · 1:30 PM",
    ago: "now",
    unread: true,
    to: "/clubs/msa",
  },
  {
    id: "n2",
    kind: "study",
    emoji: "📚",
    title: "A new MATH 1D study group was created",
    body: "Midterm Study Session · Today 5:00 PM · Library",
    ago: "18m",
    unread: true,
    to: "/study/sg1",
  },
  {
    id: "n3",
    kind: "club",
    emoji: "💻",
    title: "Programming Club posted a new event",
    body: "Mini Hack Night · Friday 5:00 PM",
    ago: "2h",
    unread: true,
    to: "/events/prog-hack",
  },
  {
    id: "n4",
    kind: "social",
    emoji: "💬",
    title: "Priya commented on your post",
    body: "\"I'll be there — saving you a seat.\"",
    ago: "4h",
    to: "/social",
  },
  {
    id: "n5",
    kind: "event",
    emoji: "📅",
    title: "An event you saved starts tomorrow",
    body: "Cultural Festival Night · Fri 6:00 PM",
    ago: "6h",
    to: "/events/cultural-fest",
  },
  {
    id: "n6",
    kind: "social",
    emoji: "👋",
    title: "Daniel K. followed you",
    body: "Physics · 2nd year",
    ago: "1d",
    to: "/social",
  },
  {
    id: "n7",
    kind: "study",
    emoji: "📚",
    title: "Three new students joined your group",
    body: "PHYS 4B Homework Session",
    ago: "2d",
    to: "/study/sg2",
  },
];
