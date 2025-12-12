import { BaseUser } from "@/types/user";
import Image from "next/image";
import Link from "next/link";

interface UserCardProps {
  user: BaseUser;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Link
      href={`/profiles/${user.id}`}
      className="flex flex-col items-center justify-center gap-5 bg-light-900 dark:bg-dark-200 border border-light-border-color rounded-[10px] p-[30px] w-[260px] shadow-[0px_12px_20px_0px_rgba(184,184,184,0.03),0px_6px_12px_0px_rgba(184,184,184,0.02),0px_2px_4px_0px_rgba(184,184,184,0.03)] dark:shadow-none transition-shadow hover:shadow-md cursor-pointer"
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center justify-center gap-[18px]">
        {/* Avatar */}
        <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden">
          <Image
            src={user.avatar || "/avatar.png"}
            alt={user.name}
            fill
            className="object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center gap-[7px]">
          <h3 className="text-xl font-bold leading-[26px] text-dark-200 dark:text-light-900 text-center">
            {user.name}
          </h3>
          <p className="text-sm leading-[19.6px] text-dark-500 dark:text-light-500 text-center">
            @{user.username}
          </p>
        </div>
      </div>
    </Link>
  );
}
