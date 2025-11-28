import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sidebarItemVariants = cva(
  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
  {
    variants: {
      active: {
        true: "bg-accent text-accent-foreground",
        false: "text-muted-foreground hover:bg-muted hover:text-foreground",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export interface SidebarItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof sidebarItemVariants> {
  icon?: React.ReactNode;
  label: string;
  href: string;
  asChild?: boolean;
}

const SidebarItem = React.forwardRef<HTMLAnchorElement, SidebarItemProps>(
  ({ className, icon, label, href, active, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : Link;

    return (
      <Comp
        ref={ref}
        href={href}
        className={cn(sidebarItemVariants({ active, className }))}
        {...props}
      >
        {icon && <span className="h-4 w-4 shrink-0">{icon}</span>}
        <span>{label}</span>
      </Comp>
    );
  }
);

SidebarItem.displayName = "SidebarItem";

export { SidebarItem, sidebarItemVariants };
