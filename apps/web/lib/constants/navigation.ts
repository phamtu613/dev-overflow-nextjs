import {
  Home,
  Users,
  Star,
  Tag,
  HelpCircle,
  ThumbsUp,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon?: LucideIcon;
  color?: string;
}
export const NAV_ITEMS = [
  {
    href: "/",
    label: "Home",
    icon: Home,
    color: "text-blue-500",
  },
  {
    href: "/collections",
    label: "Collections",
    icon: Star,
    color: "text-yellow-500",
  },
  {
    href: "/tags",
    label: "Tags",
    icon: Tag,
    color: "text-purple-500",
  },
  {
    href: "/communities",
    label: "Communities",
    icon: Users,
    color: "text-green-500",
  },
  {
    href: "/ask",
    label: "Ask a Question",
    icon: HelpCircle,
    color: "text-orange-500",
  },
  {
    href: "/recommended",
    label: "Recommended Qs",
    icon: ThumbsUp,
    color: "text-pink-500",
  },
] as const satisfies readonly NavItem[];
