import {
  CommunityUserCard,
  GetCommunityUsersResponse,
  SortOption,
} from "@/types/community";

const MOCK_USERS_DB: CommunityUserCard[] = [
  {
    id: "u1",
    name: "David Ramero",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David1",
    methodSort: "Highest Reputation",
    rank: {
      "Highest Reputation": 1,
      Popular: 3,
      Moderators: 5,
    },
  },
  {
    id: "u2",
    name: "Adrien Evans",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adrien",
    methodSort: "Highest Reputation",
    rank: {
      "Highest Reputation": 3,
      Popular: 1,
    },
  },
  {
    id: "u3",
    name: "Joseph Turner",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joseph",
    methodSort: "Highest Reputation",
    rank: {
      "Highest Reputation": 5,
      Popular: 5,
      Moderators: 1,
    },
  },
  {
    id: "u4",
    name: "Ethan Sullivan",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
    methodSort: "Highest Reputation",
    rank: {
      "Highest Reputation": 7,
      Popular: 4,
      Moderators: 3,
    },
  },
  {
    id: "u5",
    name: "James Reynolds",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    methodSort: "Highest Reputation",
    rank: {
      "Highest Reputation": 8,
      Popular: 7,
    },
  },
  {
    id: "u6",
    name: "Sophia Parker",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
    methodSort: "Highest Reputation",
    rank: {
      "Highest Reputation": 9,
      Popular: 2,
    },
  },
  {
    id: "u7",
    name: "Ava Sullivan",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava",
    methodSort: "Highest Reputation",
    rank: {
      "Highest Reputation": 10,
      Popular: 8,
    },
  },
  {
    id: "u8",
    name: "Lily Turner",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lily",
    methodSort: "Highest Reputation",
    rank: {
      "Highest Reputation": 11,
      Popular: 9,
    },
  },
  {
    id: "u9",
    name: "Oliver Brooks",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver",
    methodSort: "Highest Reputation",
    rank: {
      "Highest Reputation": 12,
      Popular: 10,
    },
  },
  {
    id: "u10",
    name: "Samuel Cooper",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel",
    methodSort: "Highest Reputation",
    rank: {
      "Highest Reputation": 13,
      Popular: 11,
    },
  },
  {
    id: "u11",
    name: "Lucas Mitchell",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
    methodSort: "Highest Reputation",
    rank: {
      "Highest Reputation": 14,
      Popular: 6,
    },
  },
  {
    id: "u12",
    name: "Charlotte Brooks",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlotte",
    methodSort: "Highest Reputation",
    rank: {
      "Highest Reputation": 15,
      Popular: 12,
    },
  },
  {
    id: "u13",
    name: "David Ramero",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David2",
    methodSort: "Highest Reputation",
    rank: {
      "Highest Reputation": 2,
      Popular: 13,
    },
  },
  {
    id: "u14",
    name: "David Ramero",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David3",
    methodSort: "Highest Reputation",
    rank: {
      "Highest Reputation": 4,
      Moderators: 2,
    },
  },
  {
    id: "u15",
    name: "David Ramero",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David4",
    methodSort: "Highest Reputation",
    rank: {
      "Highest Reputation": 6,
      Moderators: 4,
    },
  },
  {
    id: "u16",
    name: "David Ramero",
    username: "bobur_mavlonov",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David5",
    methodSort: "Highest Reputation",
    rank: {
      "Highest Reputation": 16,
    },
  },
];

/**
 * Helper: Get rank for sort method
 */
function getUserRank(user: CommunityUserCard, sortBy: SortOption): number {
  return user.rank[sortBy] ?? 999;
}

/**
 * Backend sorting + Update methodSort
 */
function sortAndUpdateUsers(
  users: CommunityUserCard[],
  sortBy: SortOption,
): CommunityUserCard[] {
  let sorted: CommunityUserCard[];

  switch (sortBy) {
    case "Highest Reputation":
      // Sort by rank (lower is better)
      sorted = [...users].sort((a, b) => {
        const rankA = getUserRank(a, sortBy);
        const rankB = getUserRank(b, sortBy);
        return rankA - rankB;
      });
      break;

    case "Popular":
      sorted = [...users].sort((a, b) => {
        const rankA = getUserRank(a, sortBy);
        const rankB = getUserRank(b, sortBy);
        return rankA - rankB;
      });
      break;

    case "Moderators":
      // Chỉ lấy users có Moderators rank
      const moderators = users.filter(
        (u) => u.rank["Moderators"] !== undefined,
      );
      sorted = moderators.sort((a, b) => {
        const rankA = getUserRank(a, sortBy);
        const rankB = getUserRank(b, sortBy);
        return rankA - rankB;
      });
      break;

    default:
      sorted = [...users];
  }

  // Update methodSort
  return sorted.map((user) => ({
    ...user,
    methodSort: sortBy,
  }));
}

/**
 * Simulate Backend API
 */
export async function fetchCommunityUsers(
  search: string = "",
  sortBy: SortOption = "Highest Reputation",
  page: number = 1,
  pageSize: number = 16,
): Promise<GetCommunityUsersResponse> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Filter
  let results = MOCK_USERS_DB;
  if (search) {
    const query = search.toLowerCase();
    results = results.filter(
      (u) =>
        u.name.toLowerCase().includes(query) ||
        u.username.toLowerCase().includes(query),
    );
  }

  // Sort
  results = sortAndUpdateUsers(results, sortBy);

  // Paginate
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
    meta: {
      sortedBy: sortBy,
      searchQuery: search || undefined,
    },
  };
}
