// components/app-sidebar.tsx
"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "@repo/ui/sidebar";
import { SidebarItem } from "@/components/ui/sidebar-item";
import {
  HelpCircle,
  Home,
  Star,
  Tag,
  ThumbsUp,
  Users,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon?: LucideIcon;
  color?: string;
}

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home, color: "text-blue-500" },
  { href: "/collections", label: "Collections", icon: Star, color: "text-yellow-500" },
  { href: "/tags", label: "Tags", icon: Tag, color: "text-purple-500" },
  { href: "/communities", label: "Communities", icon: Users, color: "text-green-500" },
  { href: "/ask", label: "Ask a Question", icon: HelpCircle, color: "text-orange-500" },
  { href: "/recommended", label: "Recommended Qs", icon: ThumbsUp, color: "text-pink-500" },
] as const satisfies readonly NavItem[];

type NavItemFromConst = (typeof NAV_ITEMS)[number];
const AppSidebarContext = React.createContext<{ pathname: string } | undefined>(
  undefined,
);

interface AppSidebarProps {
  children: React.ReactNode;
}

function AppSidebar({ children }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <AppSidebarContext.Provider value={{ pathname }}>
      <Sidebar>{children}</Sidebar>
    </AppSidebarContext.Provider>
  );
}

AppSidebar.Header = function AppSidebarHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarHeader>{children}</SidebarHeader>;
};

AppSidebar.Content = function AppSidebarContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarContent>{children}</SidebarContent>;
};

AppSidebar.Footer = function AppSidebarFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarFooter>{children}</SidebarFooter>;
};

AppSidebar.NavItems = function AppSidebarNavItems({
  items = NAV_ITEMS,
}: { items?: readonly Partial<NavItemFromConst>[] } = {}) {
  const context = React.useContext(AppSidebarContext);
  if (!context)
    throw new Error("AppSidebar.NavItems must be used within AppSidebar");
  const { pathname } = context;

  // Build a link that goes up one level from the current pathname, then appends item.href
  const parentPath = React.useMemo(() => {
    const parts = (pathname || "/").split("/").filter(Boolean);
    parts.pop();
    const base = parts.length ? `/${parts.join("/")}` : "/";
    return base;
  }, [pathname]);

  const joinHref = React.useCallback((base: string, child: string) => {
    const baseClean = base === "/" ? "" : base.replace(/\/$/, "");
    const childClean = child.replace(/^\//, "");
    const joined = [baseClean, childClean].filter(Boolean).join("/");
    return `/${joined}` || "/";
  }, []);

  return (
    <div className="space-y-2">
      {items.map((item: Partial<NavItemFromConst>) => {
        if (!item.href || !item.label) return null;
        const IconComponent = item.icon;
        const iconNode = IconComponent ? (
          <IconComponent
            className={`h-4 w-4 ${item.color || "text-gray-500"}`}
          />
        ) : undefined;

        const computedHref = joinHref(parentPath, item.href);

        return (
          <SidebarItem
            key={item.href}
            href={computedHref}
            label={item.label}
            active={pathname === computedHref}
            icon={iconNode}
          />
        );
      })}
    </div>
  );
};

export { AppSidebar };
