import { TopTagItem } from "@/types";

interface TopTagsSidebarProps {
  tags: TopTagItem[];
}

export function TopTagsSidebar({ tags }: TopTagsSidebarProps) {
  return (
    <div className="bg-white dark:bg-[#11141C] transition pt-9 pr-11 pb-9 pl-11">
      <h2 className="text-xl font-bold text-color-foreground mb-6">Top Tags</h2>

      <div className="space-y-3">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center justify-between p-3 bg-light-800 dark:bg-muted rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{tag.icon}</span>
              <span className="font-medium text-color-foreground text-sm">
                {tag.name}
              </span>
            </div>
            <span className="text-sm font-semibold text-color-foreground">
              {tag.count.toLocaleString()}+
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
