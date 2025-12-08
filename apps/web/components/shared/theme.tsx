"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

const Theme = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer border-none bg-transparent shadow-none focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {theme === "light" ? (
            <Sun className="h-5 w-5 text-orange-500" />
          ) : (
            <Moon className="h-5 w-5 text-orange-500" />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute -right-12 mt-3 min-w-[120px] rounded border bg-white py-2 dark:border-dark-400 dark:bg-dark-300">
          {themes.map((item) => {
            const Icon = item.icon;
            return (
              <MenubarItem
                key={item.value}
                className="flex cursor-pointer items-center gap-4 px-2.5 py-2 focus:bg-light-800 dark:focus:bg-dark-400"
                onClick={() => setTheme(item.value)}
              >
                <Icon
                  className={`h-4 w-4 ${theme === item.value ? "text-orange-500" : "text-gray-500 dark:text-light-500"}`}
                />
                <p
                  className={`text-sm font-semibold ${theme === item.value ? "text-orange-500" : "text-dark-100 dark:text-light-900"}`}
                >
                  {item.label}
                </p>
              </MenubarItem>
            );
          })}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
