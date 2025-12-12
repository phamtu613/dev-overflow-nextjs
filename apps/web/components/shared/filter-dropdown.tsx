import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ChevronDown, Filter } from "lucide-react";

interface FilterDropdownProps<T extends string> {
  value: T;
  onValueChange: (value: T) => void;
  options: Record<T, string>;
  placeholder?: string;
  className?: string;
}

export function FilterDropdown<T extends string>({
  value,
  onValueChange,
  options,
  placeholder,
  className,
}: FilterDropdownProps<T>) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          "h-14 w-full gap-1.5 rounded-[5px] border-light-800 bg-light-800 px-2.5 text-sm font-semibold text-dark-500 dark:border-dark-400 dark:bg-dark-300 dark:text-light-900 sm:w-auto",
          className
        )}
      >
        <Filter className="h-6 w-6" />
        <SelectValue placeholder={placeholder} />
        <ChevronDown className="h-5 w-5" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(options).map(([key, label]) => (
          <SelectItem key={key} value={key}>
            {label as string}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
