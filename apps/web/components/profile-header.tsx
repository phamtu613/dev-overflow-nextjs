import { User } from "@/types";
import { Calendar, LinkIcon, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="bg-white dark:bg-[#11141C] transition pt-9 pr-11 pb-9 pl-11">
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <div className="shrink-0">
          <div className="size-[140px] rounded-full border-3 border-primary overflow-hidden bg-light-800 dark:bg-muted">
            <Image
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="w-full h-full object-cover"
              width={140}
              height={140}
            />
          </div>
        </div>

        {/* User Info */}
        <div className="w-4/6">
          <h1 className="text-3xl font-bold text-color-foreground mb-1">
            {user.name}
          </h1>
          <p className="text-[#0F1117] mb-4">@{user.username}</p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
            {user.website && (
              <Link
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-[#1DA1F2] gap-2 hover:text-primary transition-colors"
              >
                <LinkIcon className="size-5 text-[#7B8EC8]" />
                {user.website}
              </Link>
            )}
            {user.location && (
              <div className="flex items-center gap-2 text-[#212734]">
                <MapPin className="size-5 text-[#7B8EC8]" />
                {user.location}
              </div>
            )}
            <div className="flex items-center gap-2 text-[#212734]">
              <Calendar className="size-5 text-[#7B8EC8]" />
              Joined {user.joinedDate}
            </div>
          </div>

          {/* Bio */}
          <p className="text-color-foreground leading-relaxed">{user.bio}</p>
        </div>
      </div>
    </div>
  );
}
