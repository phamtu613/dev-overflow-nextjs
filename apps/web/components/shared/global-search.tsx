"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const GlobalSearch = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="relative flex min-h-14 grow items-center gap-1 rounded-xl bg-light-800 px-4 dark:bg-dark-400">
        <Search className="text-gray-500" />

        <Input
          type="text"
          placeholder="Search globally..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="border-none bg-transparent text-base text-dark-400 shadow-none outline-none placeholder:text-light-400 focus:outline-none dark:text-light-700"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
