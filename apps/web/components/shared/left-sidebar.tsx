"use client";
import { cn } from "@repo/utils/cn";
import {
  Briefcase,
  HelpCircle,
  Home,
  LogOut,
  Star,
  Tag,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarNav = [
  { id: "1", icon: <Home className="w-5 h-5" />, label: "Home", href: "/" },
  {
    id: "2",
    icon: <Star className="w-5 h-5" />,
    label: "Collections",
    href: "/collections",
  },
  {
    id: "3",
    icon: <Briefcase className="w-5 h-5" />,
    label: "Find Jobs",
    href: "/find-jobs",
  },
  { id: "4", icon: <Tag className="w-5 h-5" />, label: "Tags", href: "/tags" },
  {
    id: "5",
    icon: <Users className="w-5 h-5" />,
    label: "Communities",
    href: "/users",
  },
  {
    id: "6",
    icon: <HelpCircle className="w-5 h-5" />,
    label: "Ask a Question",
    href: "/ask-question",
  },
];

const bottomNav = [
  {
    id: "7",
    icon: <LogOut className="w-5 h-5" />,
    label: "Logout",
    href: "/logout",
  },
];

const LeftSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="h-screen bg-white dark:bg-background dark:border-r shadow pt-20 dark:border-border w-[260px] fixed left-0 top-0 z-20 flex flex-col">
      {/* Main navigation */}
      <nav className="flex-1 px-4 py-8 space-y-3 overflow-y-auto">
        {sidebarNav.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-base font-medium",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-background dark:hover:bg-muted hover:text-foreground hover:bg-primary"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
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
