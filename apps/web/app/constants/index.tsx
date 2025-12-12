import { NavItem } from "@/types";
import {
  Briefcase,
  HelpCircle,
  Home,
  LogOut,
  Star,
  Tag,
  Users,
} from "lucide-react";

export const sidebarNav: NavItem[] = [
  {
    id: "1",
    icon: <Home className="w-5 h-5" />,
    label: "Home",
    href: "/",
    active: true,
  },
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
  {
    id: "4",
    icon: <Tag className="w-5 h-5" />,
    label: "Tags",
    href: "/tags",
  },
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

export const bottomNav: NavItem[] = [
  {
    id: "7",
    icon: <LogOut className="w-5 h-5" />,
    label: "Logout",
    href: "/logout",
  },
];
