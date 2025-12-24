import {
  Answer,
  HotItem,
  PopularTag,
  Question,
  TopPost,
  TopTagItem,
  User,
} from "@/types";
import {
  CommunityUserCard,
  GetCommunityUsersResponse,
  SortOption,
} from "@/types/community";
import { Code2, FileText, Wind, Zap } from "lucide-react";

export const questions: Question[] = [
  {
    id: "1",
    title:
      "The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this",
    slug: "the-lightning-component-c-lwc_pizzatracker-generated-invalid-output-for-field-status-error-how-to-solve-this",
    excerpt:
      "I am getting an error with the Lightning Component when trying to generate output...",
    tags: [
      { id: "1", name: "JAVASCRIPT" },
      { id: "2", name: "REACT.JS" },
      { id: "3", name: "INVALID FIELDS" },
      { id: "4", name: "SALESFORCE" },
    ],
    author: {
      id: "auth1",
      name: "Satheesh",
      avatar: "/avatar.png",
    },
    timestamp: "2 mins ago",
    votes: 1200,
    answer: 900,
    views: 5200,
  },
  {
    id: "2",
    title: "How to implement lazy loading in React for better performance",
    slug: "how-to-implement-lazy-loading-in-react-for-better-performance",
    excerpt:
      "Looking for best practices on implementing lazy loading in React components...",
    tags: [
      { id: "2", name: "REACT.JS" },
      { id: "5", name: "PERFORMANCE" },
      { id: "6", name: "TYPESCRIPT" },
    ],
    author: {
      id: "auth2",
      name: "Satheesh",
      avatar: "/avatar.png",
    },
    timestamp: "5 mins ago",
    votes: 850,
    answer: 650,
    views: 3200,
  },
  {
    id: "3",
    title: "Understanding useCallback vs useMemo in React Hooks",
    slug: "understanding-usecallback-vs-usememo-in-react-hooks",
    excerpt:
      "Clarifying the differences between these two optimization hooks...",
    tags: [
      { id: "2", name: "REACT.JS" },
      { id: "1", name: "JAVASCRIPT" },
      { id: "7", name: "HOOKS" },
    ],
    author: {
      id: "auth3",
      name: "Satheesh",
      avatar: "/avatar.png",
    },
    timestamp: "10 mins ago",
    votes: 2100,
    answer: 1540,
    views: 8900,
  },
];

export const hotNetworkItems: HotItem[] = [
  {
    id: "1",
    title:
      "Would it be appropriate to point out an error in another paper during a referee report?",
    slug: "would-it-be-appropriate-to-point-out-an-error-in-another-paper-during-a-referee-report",
    icon: <FileText className="w-4 h-4 text-primary" />,
  },
  {
    id: "2",
    title: "How can an airconditioning machine exist?",
    slug: "how-can-an-airconditioning-machine-exist",
    icon: <Wind className="w-4 h-4 text-primary" />,
  },
  {
    id: "3",
    title: "Interrogated every time crossing UK Border as citizen",
    slug: "interrogated-every-time-crossing-uk-border-as-citizen",
    icon: <FileText className="w-4 h-4 text-primary" />,
  },
  {
    id: "4",
    title: "Low digit addition generator",
    slug: "low-digit-addition-generator",
    icon: <Code2 className="w-4 h-4 text-primary" />,
  },
  {
    id: "5",
    title: "What is an example of 3 numbers that do not make up a vector?",
    slug: "what-is-an-example-of-3-numbers-that-do-not-make-up-a-vector",
    icon: <Zap className="w-4 h-4 text-primary" />,
  },
];

export const popularTags: PopularTag[] = [
  { id: "1", name: "JAVASCRIPT", icon: "/js.png", count: 20152 },
  { id: "2", name: "TYPESCRIPT", icon: "/ts.png", count: 18493 },
  { id: "3", name: "THREE.JS", icon: "/threejs.png", count: 18493 },
  { id: "4", name: "TAILWIND CSS", icon: "/tailwind.png", count: 18493 },
  { id: "5", name: "REACT.JS", icon: "/react.png", count: 18493 },
  { id: "6", name: "GIT & GITHUB", icon: "/git.png", count: 18493 },
];

export const detailedQuestion: Question & { answers: Answer[] } = {
  id: "1",
  title:
    "How to refresh all the data inside the Datatable and move the data into original place after closing the modal popup close button",
  slug: "how-to-refresh-all-the-data-inside-the-datatable-and-move-the-data-into-original-place-after-closing-the-modal-popup-close-button",
  excerpt:
    "I am getting an error with the Lightning Component when trying to generate output...",
  tags: [
    { id: "1", name: "JAVASCRIPT" },
    { id: "2", name: "REACT.JS" },
    { id: "3", name: "INVALID FIELDS" },
    { id: "4", name: "SALESFORCE" },
  ],
  author: {
    id: "auth1",
    name: "Satheesh",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Satheesh",
  },
  timestamp: "2 days ago",
  votes: 1200,
  answer: 138,
  views: 5200,
  content:
    'When the user clicks a button for the first time, a spinner is displayed, the "close" button is disabled, and a modal popup is shown. When the user closes the popup by clicking the "close" button, and then clicks the same button again without refreshing the page, the data in the table should be the same as it was before. I need it so that when the user clicks the button, any changes made stay in place even after closing and reopening the popup.',
  codeSnippet: `$(document).ready(function () {
  var enabledExportCount = 50;
  $("#partslibSearchModal").on("show.bs.modal", function (e) {
    $("#partslibBigSearch head tr")
      .clone()
      .appendTo("#filterrow th")
      .each(function () {
        $("input", this).on("keyup change", function () {
          if (e.keyCode == 13 || e.which == 13) this.value == "";
          $("#partslibSpinner").modal("show");
        });
      });
  });
});`,
  answers: [
    {
      id: "ans1",
      content: `I think what you want to do is probably not to attach the foreach function to only the one array you have here, but to make it work for all arrays.

To do that, you must edit the Array prototype (something that some people have very strong opinions about, because you can protect against potential future namespace collisions - but other people find extremely useful).`,
      codeSnippet: `ngOnDestroy() {
  this.subscriptions.forEach(sub => sb.unsubscribe());
}

dismiss() {
  this.modal.dismiss();
}

loadForm() {
  this.formGroup = this.fb.group({
    articles: [this.articles],
  });
}`,
      author: {
        id: "auth2",
        name: "Philip Martin",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PhilipMartin",
      },
      timestamp: "Aug 6, 2022 at 21:01",
      votes: 15,
      isAccepted: false,
    },
    {
      id: "ans2",
      content: `You need to add the forEach method to the prototype of Arrays:

N.B. to avoid conflict with existing forEach functions (https://developer.mozilla.org/en-US/JavaScript/Reference/Global_Objects/Array/forEach) I have named the function myForEach which I expect to be safe from conflict.`,
      codeSnippet: `SaveArticles() {
  const tourneeName = this.creationTourneeService.getTournee();
  for (let i of this.grouping.getSelectedRows()) {
    this.articleService.getItemByCode(code).subscribe(res => {
      const detailTournee: DetailTournee = new DetailTournee();
      detailTournee.articleCode = res.code;
      this.creationTourneeService.setTournee(tournee);
    });
  }
}`,
      author: {
        id: "auth3",
        name: "Taylor Hernandez",
        avatar:
          "https://api.dicebear.com/7.x/avataaars/svg?seed=TaylorHernandez",
      },
      timestamp: "Aug 8, 2022 at 21:01",
      votes: 8,
      isAccepted: false,
    },
  ],
};

export const userProfile: User = {
  id: "user-faizan",
  name: "Faizan JSM",
  username: "@faizan",
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSDUVm4iEJEe0DHIfGifAA-FvVMM-rAzancQ&s",
  bio: "Launch your development career with project-based coaching - showcase your skills with practical development experience and land the coding career of your dreams. Check out jsmastery.pro",
  website: "jsmastery.pro",
  location: "Mumbai, India",
  joinedDate: "May 2023",
  stats: {
    questions: 156,
    answers: 101,
    goldBadges: 15,
    silverBadges: 23,
    bronzeBadges: 38,
  },
};

export const userTopPosts: TopPost[] = [
  {
    id: "1",
    title:
      "The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this",
    votes: 1200,
    answers: 900,
    views: 5200,
    tags: [
      { id: "1", name: "JAVASCRIPT" },
      { id: "2", name: "REACT.JS" },
      { id: "3", name: "INVALID FIELDS" },
      { id: "4", name: "SALESFORCE" },
    ],
    author: {
      id: "auth1",
      name: "Satheesh",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSDUVm4iEJEe0DHIfGifAA-FvVMM-rAzancQ&s",
    },
    timestamp: "2 mins ago",
  },
  {
    id: "2",
    title:
      "An HTML table where specific cells come from values in a Google Sheet identified by their neighboring cell",
    votes: 850,
    answers: 650,
    views: 3200,
    tags: [
      { id: "1", name: "JAVASCRIPT" },
      { id: "2", name: "REACT.JS" },
      { id: "3", name: "INVALID FIELDS" },
      { id: "4", name: "SALESFORCE" },
    ],
    author: {
      id: "auth1",
      name: "Satheesh",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSDUVm4iEJEe0DHIfGifAA-FvVMM-rAzancQ&s",
    },
    timestamp: "5 mins ago",
  },
  {
    id: "3",
    title:
      "JavaScript validation for a form stops the form data from being submitted to mysql database",
    votes: 2100,
    answers: 1540,
    views: 8900,
    tags: [
      { id: "1", name: "JAVASCRIPT" },
      { id: "2", name: "REACT.JS" },
      { id: "3", name: "INVALID FIELDS" },
      { id: "4", name: "SALESFORCE" },
    ],
    author: {
      id: "auth1",
      name: "Satheesh",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSDUVm4iEJEe0DHIfGifAA-FvVMM-rAzancQ&s",
    },
    timestamp: "10 mins ago",
  },
];

export const userTopTags: TopTagItem[] = [
  { id: "1", name: "JAVASCRIPT", icon: "🟨", count: 20152 },
  { id: "2", name: "TYPESCRIPT", icon: "🔵", count: 18493 },
  { id: "3", name: "THREE.JS", icon: "🌐", count: 18493 },
  { id: "4", name: "TAILWIND CSS", icon: "💨", count: 18493 },
  { id: "5", name: "REACT.JS", icon: "⚛️", count: 18493 },
  { id: "6", name: "GIT & GITHUB", icon: "🔧", count: 18493 },
];

// Community mock data
const MOCK_USERS_DB: CommunityUserCard[] = [
  {
    id: "u1",
    name: "David Ramero",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David1",
    methodSort: "Highest Reputation",
    rank: { "Highest Reputation": 1, Popular: 3, Moderators: 5 },
  },
  {
    id: "u2",
    name: "Adrien Evans",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adrien",
    methodSort: "Highest Reputation",
    rank: { "Highest Reputation": 3, Popular: 1 },
  },
  {
    id: "u3",
    name: "Joseph Turner",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joseph",
    methodSort: "Highest Reputation",
    rank: { "Highest Reputation": 5, Popular: 5, Moderators: 1 },
  },
  {
    id: "u4",
    name: "Ethan Sullivan",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
    methodSort: "Highest Reputation",
    rank: { "Highest Reputation": 7, Popular: 4, Moderators: 3 },
  },
  {
    id: "u5",
    name: "James Reynolds",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    methodSort: "Highest Reputation",
    rank: { "Highest Reputation": 8, Popular: 7 },
  },
  {
    id: "u6",
    name: "Sophia Parker",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
    methodSort: "Highest Reputation",
    rank: { "Highest Reputation": 9, Popular: 2 },
  },
  {
    id: "u7",
    name: "Ava Sullivan",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava",
    methodSort: "Highest Reputation",
    rank: { "Highest Reputation": 10, Popular: 8 },
  },
  {
    id: "u8",
    name: "Lily Turner",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lily",
    methodSort: "Highest Reputation",
    rank: { "Highest Reputation": 11, Popular: 9 },
  },
  {
    id: "u9",
    name: "Oliver Brooks",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver",
    methodSort: "Highest Reputation",
    rank: { "Highest Reputation": 12, Popular: 10 },
  },
  {
    id: "u10",
    name: "Samuel Cooper",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel",
    methodSort: "Highest Reputation",
    rank: { "Highest Reputation": 13, Popular: 11 },
  },
  {
    id: "u11",
    name: "Lucas Mitchell",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
    methodSort: "Highest Reputation",
    rank: { "Highest Reputation": 14, Popular: 6 },
  },
  {
    id: "u12",
    name: "Charlotte Brooks",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlotte",
    methodSort: "Highest Reputation",
    rank: { "Highest Reputation": 15, Popular: 12 },
  },
  {
    id: "u13",
    name: "David Ramero",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David2",
    methodSort: "Highest Reputation",
    rank: { "Highest Reputation": 2, Popular: 13 },
  },
  {
    id: "u14",
    name: "David Ramero",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David3",
    methodSort: "Highest Reputation",
    rank: { "Highest Reputation": 4, Moderators: 2 },
  },
  {
    id: "u15",
    name: "David Ramero",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David4",
    methodSort: "Highest Reputation",
    rank: { "Highest Reputation": 6, Moderators: 4 },
  },
  {
    id: "u16",
    name: "David Ramero",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David5",
    methodSort: "Highest Reputation",
    rank: { "Highest Reputation": 16 },
  },
];

function getUserRank(user: CommunityUserCard, sortBy: SortOption): number {
  return user.rank[sortBy] ?? 999;
}

function sortAndUpdateUsers(
  users: CommunityUserCard[],
  sortBy: SortOption
): CommunityUserCard[] {
  let sorted: CommunityUserCard[];

  switch (sortBy) {
    case "Highest Reputation":
    case "Popular":
      sorted = [...users].sort(
        (a, b) => getUserRank(a, sortBy) - getUserRank(b, sortBy)
      );
      break;
    case "Moderators":
      const moderators = users.filter(
        (u) => u.rank["Moderators"] !== undefined
      );
      sorted = moderators.sort(
        (a, b) => getUserRank(a, sortBy) - getUserRank(b, sortBy)
      );
      break;
    default:
      sorted = [...users];
  }

  return sorted.map((user) => ({ ...user, methodSort: sortBy }));
}

export async function fetchCommunityUsers(
  search: string = "",
  sortBy: SortOption = "Highest Reputation",
  page: number = 1,
  pageSize: number = 16
): Promise<GetCommunityUsersResponse> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  let results = MOCK_USERS_DB;
  if (search) {
    const query = search.toLowerCase();
    results = results.filter(
      (u) =>
        u.name.toLowerCase().includes(query) ||
        u.username.toLowerCase().includes(query)
    );
  }

  results = sortAndUpdateUsers(results, sortBy);

  const totalUsers = results.length;
  const totalPages = Math.ceil(totalUsers / pageSize);
  const startIdx = (page - 1) * pageSize;
  const users = results.slice(startIdx, startIdx + pageSize);

  return {
    users,
    pagination: {
      currentPage: page,
      pageSize,
      totalUsers,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
    meta: { sortedBy: sortBy, searchQuery: search || undefined },
  };
}
