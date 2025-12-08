import { useQuery } from "@tanstack/react-query";
import { fetchCommunityUsers } from "@/app/constants/mocks/community";
import { SortOption } from "@/types/community";

export function useCommunityUsers(
  search: string,
  sortBy: SortOption,
  page: number = 1,
) {
  return useQuery({
    queryKey: ["community-users", search, sortBy, page],
    queryFn: () => fetchCommunityUsers(search, sortBy, page, 16),
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev: any) => prev,
  });
}
