"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface UserSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function UserSearch({ value, onChange }: UserSearchProps) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      <Input
        type="search"
        placeholder="Search by username..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 h-12"
      />
    </div>
  );
}
