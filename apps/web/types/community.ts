import { BaseUser } from "./user";

export type SortOption = "Highest Reputation" | "Popular" | "Moderators";

type RankBySort = {
  [K in SortOption]?: number;
};

export interface CommunityUserCard extends BaseUser {
  methodSort: SortOption;
  rank: RankBySort;
}

// API Response
export interface GetCommunityUsersResponse {
  users: CommunityUserCard[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalUsers: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  meta: {
    sortedBy: SortOption;
    searchQuery?: string;
  };
}
