"use client";

import { FilterDropdown } from "@/components/shared/filter-dropdown";
import { Card } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import { popularTags } from "@/lib/mock-data";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type SortOption = "Popular" | "Recent" | "Name" | "Old";

export default function TagsPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("Popular");

  // Filter and sort tags based on search and sort option
  const filteredTags = popularTags
    .filter((tag) => tag.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "Popular":
          return b.count - a.count;
        case "Name":
          return a.name.localeCompare(b.name);
        case "Recent":
        case "Old":
          return 0; // Would need timestamp data
        default:
          return 0;
      }
    });

  const sortOptions: Record<SortOption, string> = {
    Popular: "Most Popular",
    Recent: "Recent",
    Name: "Name",
    Old: "Old",
  };

  return (
    <div className="px-12 pb-16">
      {/* Header */}
      <h1 className="mb-10 text-[30px] font-bold leading-[42px] tracking-[-0.03em] text-dark-100 dark:text-light-900">
        Tags
      </h1>

      {/* Search and Filter */}
      <div className="mb-16 flex flex-col gap-7 sm:flex-row">
        {/* Search */}
        <div className="relative max-w-3xl flex-1">
          <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-light-400" />
          <Input
            type="text"
            placeholder="Search by tag name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-14 rounded-[10px] border-light-700 bg-light-800 pl-12 text-base text-dark-100 placeholder:text-light-400 dark:border-dark-400 dark:bg-dark-300 dark:text-light-900"
          />
        </div>

        {/* Filter Dropdown */}
        <FilterDropdown
          value={sortBy}
          onValueChange={setSortBy}
          options={sortOptions}
        />
      </div>

      {/* Tags Grid */}
      {filteredTags.length > 0 ? (
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTags.map((tag) => (
            <Link key={tag.id} href={`/tags/${tag.id}`}>
              <Card className="group flex h-full cursor-pointer flex-col gap-3.5 rounded-[10px] border-light-border-color bg-light-900 p-10 shadow-light-tag-card transition-all hover:shadow-lg dark:border-dark-400 dark:bg-dark-300 dark:shadow-none">
                {/* Tag Info */}
                <div className="flex flex-col gap-4.5">
                  {/* Tag Badge */}
                  <div className="inline-flex w-fit items-center gap-1.5 rounded border border-light-800 bg-light-800 px-5 py-1.5 dark:border-dark-400 dark:bg-dark-400">
                    <span className="text-base font-semibold leading-[20.8px] text-dark-300 dark:text-light-700">
                      {tag.name}
                    </span>
                  </div>

                  {/* Tag Description */}
                  <p className="line-clamp-3 text-xs leading-[15.6px] text-dark-500 dark:text-light-500">
                    JavaScript, often abbreviated as JS, is a programming
                    language that is one of the core technologies of the World
                    Wide Web, alongside HTML and CSS
                  </p>
                </div>

                {/* Tag Stats */}
                <div className="flex items-center gap-2.5">
                  <span className="bg-linear-to-r from-[#FF7000] to-[#E2995F] bg-clip-text text-sm font-semibold leading-[18.2px] text-transparent">
                    {tag.count.toLocaleString()}+
                  </span>
                  <span className="text-xs font-medium leading-[15.6px] text-dark-400 dark:text-light-700">
                    Questions
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-lg font-medium text-dark-100 dark:text-light-900">
            No tags found
          </p>
          <p className="mt-1 text-sm text-dark-500 dark:text-light-500">
            Try adjusting your search criteria
          </p>
        </div>
      )}
    </div>
  );
}
