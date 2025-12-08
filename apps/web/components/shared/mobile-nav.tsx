"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const pathname = usePathname();

  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`${
                isActive
                  ? "rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 text-light-900"
                  : "text-dark-300 dark:text-light-900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "dark:invert"}`}
              />
              <p
                className={`${isActive ? "text-lg font-bold" : "text-lg font-medium"}`}
              >
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="cursor-pointer dark:invert sm:hidden"
        />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="border-none bg-light-900 dark:bg-dark-200"
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/images/site-logo.svg"
            width={23}
            height={23}
            alt="DevOverflow"
          />
          <p className="text-2xl font-bold text-dark-100 dark:text-light-900">
            Dev<span className="text-primary">Overflow</span>
          </p>
        </Link>

        <div className="no-scrollbar h-[calc(100vh-80px)] overflow-y-auto">
          <SheetClose asChild>
            <NavContent />
          </SheetClose>

          <div className="mt-10 flex flex-col gap-3">
            <SheetClose asChild>
              <Link href="/sign-in">
                <Button className="min-h-[41px] w-full rounded-lg bg-light-800 px-4 py-3 text-sm font-medium shadow-none dark:bg-dark-400">
                  <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                    Log In
                  </span>
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/sign-up">
                <Button className="min-h-[41px] w-full rounded-lg border border-light-700 bg-light-700 px-4 py-3 text-sm font-medium text-dark-400 shadow-none dark:border-dark-400 dark:bg-dark-300 dark:text-light-900">
                  Sign Up
                </Button>
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
