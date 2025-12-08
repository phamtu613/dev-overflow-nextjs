"use client";

import { useState } from "react";
import { SortOption } from "@/types/community";
import { useCommunityUsers } from "@/hooks/useCommunityUsers";
import { UserGrid } from "./UserGrid";
import { UserSearch } from "./UserSearch";
import { UserFilter } from "./UserFilter";
import { UserGridSkeleton } from "./UserGridSkeleton";

export function CommunityContent() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("Highest Reputation");

  const { data, isLoading, isError } = useCommunityUsers(search, sortBy);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <UserSearch value={search} onChange={setSearch} />
        <UserFilter value={sortBy} onChange={setSortBy} />
      </div>

      {/* Loading */}
      {isLoading && <UserGridSkeleton />}

      {/* Error */}
      {isError && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-lg font-medium text-destructive">
            Failed to load users
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Please try again later
          </p>
        </div>
      )}

      {/* Success */}
      {data && (
        <>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{data.pagination.totalUsers} users</span>
            <span>
              Sorted by:{" "}
              <span className="font-medium text-foreground">
                {data.meta.sortedBy}
              </span>
            </span>
          </div>
          <UserGrid users={data.users} />
        </>
      )}
    </div>
  );
}
