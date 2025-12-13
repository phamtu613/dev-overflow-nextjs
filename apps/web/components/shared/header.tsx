import { Button } from "@repo/ui/button";
import { Search, Sun, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="shadow fixed top-0 right-0 h-16 bg-white dark:bg-background left-0 dark:border-b dark:border-border flex items-center justify-between px-8 z-40">
      <div className="flex items-center gap-4 flex-1 justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="DevOverflow" width={30} height={30} />
          <span className="font-bold text-lg text-muted">
            Dev<span className="text-primary">Overflow</span>
          </span>
        </Link>

        <div className="flex-1 max-w-md">
          <div className="relative w-[600px] -left-52">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 w-full px-4 py-3 dark:bg-muted border dark:border-border border-[#DCE3F1] rounded-lg text-color-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button size="icon" variant="ghost" className="text-muted-foreground">
            <Sun className="w-5 h-5" />
          </Button>
          <Button size="icon" variant="ghost" className="text-muted-foreground">
            <Link href="/sign-in">
              <User className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
