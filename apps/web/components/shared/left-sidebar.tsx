"use client";
import { bottomNav, sidebarNav } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

const LeftSidebar = () => {
  return (
    <aside className="h-screen bg-white dark:bg-background dark:border-r shadow pt-20 dark:border-border w-[260px] fixed left-0 top-0 z-20 flex flex-col">
      {/* Main navigation */}
      <nav className="flex-1 px-4 py-8 space-y-3 overflow-y-auto">
        {sidebarNav.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-base font-medium",
              item.active
                ? "bg-primary text-primary-foreground"
                : "text-background dark:hover:bg-muted hover:text-foreground hover:bg-primary",
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Bottom navigation */}
      <nav className="px-4 py-4 space-y-2">
        {bottomNav.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-color-foreground dark:hover:bg-muted transition-colors text-base font-medium"
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
export default LeftSidebar;
