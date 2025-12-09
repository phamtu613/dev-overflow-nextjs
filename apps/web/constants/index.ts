export const BADGE_CRITERIA = {
  GOLD: 15,
  SILVER: 10,
  BRONZE: 5,
};

export const HomePageFilters = [
  { name: "Newest", value: "newest" },
  { name: "Recommended", value: "recommended" },
  { name: "Frequent", value: "frequent" },
  { name: "Unanswered", value: "unanswered" },
];

export const UserFilters = [
  { name: "New Users", value: "new_users" },
  { name: "Old Users", value: "old_users" },
  { name: "Top Contributors", value: "top_contributors" },
];

export const QuestionFilters = [
  { name: "Most Recent", value: "most_recent" },
  { name: "Oldest", value: "oldest" },
  { name: "Most Voted", value: "most_voted" },
  { name: "Most Viewed", value: "most_viewed" },
  { name: "Most Answered", value: "most_answered" },
];

export const TagFilters = [
  { name: "Popular", value: "popular" },
  { name: "Recent", value: "recent" },
  { name: "Name", value: "name" },
  { name: "Old", value: "old" },
];

export const GlobalSearchFilters = [
  { name: "Question", value: "question" },
  { name: "Answer", value: "answer" },
  { name: "User", value: "user" },
  { name: "Tag", value: "tag" },
];

export const sidebarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },
  {
    imgURL: "/assets/icons/suitcase.svg",
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
];

export const questions = [
  {
    _id: "1",
    title: "Cascading Deletes in SQLAlchemy?",
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "sql" },
      { _id: "3", name: "sqlalchemy" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      username: "johndoe",
      picture: "https://github.com/shadcn.png",
    },
    upvotes: 1500000, // Test format số lớn (1.5M)
    views: 500552,
    answers: 12,
    createdAt: new Date("2023-09-01T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "How to perfectly center a div with Tailwind CSS?",
    tags: [
      { _id: "4", name: "css" },
      { _id: "5", name: "tailwindcss" },
    ],
    author: {
      _id: "2",
      name: "Sarah Smith",
      username: "sarahsmith",
      picture: "https://github.com/shadcn.png",
    },
    upvotes: 12,
    views: 50,
    answers: 2,
    createdAt: new Date("2023-11-20T12:00:00.000Z"),
  },
  {
    _id: "3",
    title:
      "Best practices for data fetching in a Next.js application with Server Actions?",
    tags: [
      { _id: "6", name: "next.js" },
      { _id: "7", name: "react" },
    ],
    author: {
      _id: "3",
      name: "David Ramero",
      username: "davidramero",
      picture: "https://github.com/shadcn.png",
    },
    upvotes: 450,
    views: 1200,
    answers: 5,
    createdAt: new Date("2023-11-28T09:30:00.000Z"),
  },
  {
    _id: "4",
    title: "Redux Toolkit vs Zustand: Which one to choose for a small project?",
    tags: [
      { _id: "7", name: "react" },
      { _id: "8", name: "state-management" },
      { _id: "9", name: "redux" },
    ],
    author: {
      _id: "4",
      name: "Emily Chen",
      username: "emilychen",
      picture: "https://github.com/shadcn.png",
    },
    upvotes: 89,
    views: 340,
    answers: 10,
    createdAt: new Date("2023-10-05T14:15:00.000Z"),
  },
];
