"use client";

import { FilterDropdown } from "@/components/shared/filter-dropdown";
import { Input } from "@/components/ui/input";
import { UserCard } from "@/components/user-card";
import { BaseUser } from "@/types/user";
import { Search } from "lucide-react";
import { useState } from "react";

// Mock users data
const mockUsers: BaseUser[] = [
  {
    id: "u1",
    name: "David Ramero",
    username: "bobur_mavlonov",
    avatar: "/avatar.png",
  },
  {
    id: "u2",
    name: "David Ramero",
    username: "bobur_mavlonov",
    avatar: "/avatar.png",
  },
  {
    id: "u3",
    name: "Adrien Evans",
    username: "bobur_mavlonov",
    avatar: "/avatar.png",
  },
  {
    id: "u4",
    name: "David Ramero",
    username: "bobur_mavlonov",
    avatar: "/avatar.png",
  },
  {
    id: "u5",
    name: "Joseph Turner",
    username: "bobur_mavlonov",
    avatar: "/avatar.png",
  },
  {
    id: "u6",
    name: "Ethan Sullivan",
    username: "bobur_mavlonov",
    avatar: "/avatar.png",
  },
  {
    id: "u7",
    name: "James Reynolds",
    username: "bobur_mavlonov",
    avatar: "/avatar.png",
  },
  {
    id: "u8",
    name: "Sophia Parker",
    username: "bobur_mavlonov",
    avatar: "/avatar.png",
  },
  {
    id: "u9",
    name: "Ava Sullivan",
    username: "bobur_mavlonov",
    avatar: "/avatar.png",
  },
  {
    id: "u10",
    name: "Lily Turner",
    username: "bobur_mavlonov",
    avatar: "/avatar.png",
  },
  {
    id: "u11",
    name: "Oliver Brooks",
    username: "bobur_mavlonov",
    avatar: "/avatar.png",
  },
  {
    id: "u12",
    name: "David Ramero",
    username: "bobur_mavlonov",
    avatar: "/avatar.png",
  },
  {
    id: "u13",
    name: "Samuel Cooper",
    username: "bobur_mavlonov",
    avatar: "/avatar.png",
  },
  {
    id: "u14",
    name: "Lucas Mitchell",
    username: "bobur_mavlonov",
    avatar: "/avatar.png",
  },
  {
    id: "u15",
    name: "Charlotte Brooks",
    username: "bobur_mavlonov",
    avatar: "/avatar.png",
  },
  {
    id: "u16",
    name: "David Ramero",
    username: "bobur_mavlonov",
    avatar: "/avatar.png",
  },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Highest Reputation");

  // Filter users based on search term
  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-12 pb-16 flex flex-col gap-10">
      {/* Header */}
      <h1 className="text-[30px] font-bold leading-[42px] tracking-[-0.03em] text-dark-100 dark:text-light-900">
        All Users
      </h1>

      {/* Search and Filter */}
      <div className="flex items-center gap-[30px]">
        {/* Search Input */}
        <div className="relative w-[600px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-light-400" />
          <Input
            type="text"
            placeholder="Search by Username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-14 pl-14 pr-4 bg-light-800 dark:bg-dark-300 border border-light-700 dark:border-dark-400 rounded-[10px] text-base text-dark-100 dark:text-light-900 placeholder:text-light-400 dark:placeholder:text-dark-500 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        {/* Filter Select */}
        <FilterDropdown
          value={filter}
          onValueChange={setFilter}
          options={{
            "Highest Reputation": "Highest Reputation",
            Popular: "Popular",
            Moderators: "Moderators",
          }}
        />
      </div>

      {/* Users Grid */}
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-9">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-dark-400 dark:text-light-500">
            No users found matching &quot;{searchTerm}&quot;
          </p>
        </div>
      )}
    </div>
  );
}
