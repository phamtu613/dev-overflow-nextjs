import { PopularTag } from "@/types";
import Image from "next/image";

interface PopularTagsProps {
  tags: PopularTag[];
}

export function PopularTags({ tags }: PopularTagsProps) {
  return (
    <div className="dark:bg-card border border-[#C8CBD954] dark:border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-color-foreground mb-4">
        Popular Tags
      </h2>
      <div className="space-y-5">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center justify-between rounded-lg transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 text-color-muted-foreground bg-light-800 dark:bg-muted px-4 py-2 rounded">
              <Image
                src={tag.icon}
                alt={tag.name}
                className="size-3.5"
                width={16}
                height={16}
              />
              <span className="font-medium text-color-foreground text-sm">
                {tag.name}
              </span>
            </div>
            <span className="text-xs font-semibold text-color-muted-foreground px-2">
              {tag.count.toLocaleString()}+
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
