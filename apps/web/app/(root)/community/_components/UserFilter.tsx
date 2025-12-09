"use client";

import { SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOption } from "@/types/community";

interface UserFilterProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const OPTIONS: SortOption[] = ["Highest Reputation", "Popular", "Moderators"];

export function UserFilter({ value, onChange }: UserFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[220px] h-12">
        <SlidersHorizontal className="mr-2 h-4 w-4" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {OPTIONS.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
