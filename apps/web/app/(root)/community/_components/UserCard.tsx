import Link from "next/link";
import { CommunityUserCard } from "@/types/community";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface UserCardProps {
  user: CommunityUserCard;
}

export function UserCard({ user }: UserCardProps) {
  // Lấy rank theo methodSort
  const currentRank = user.rank[user.methodSort];
  const showRank = currentRank !== undefined && currentRank <= 10;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all hover:shadow-lg hover:border-primary/50",
        "p-0",
      )}
    >
      <Link href={`/profile/${user.id}`} className="block">
        {/* Rank Badge */}
        {showRank && (
          <Badge
            className={cn(
              "absolute top-3 right-3 font-bold z-10 text-xs",
              currentRank <= 3
                ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-950 border-yellow-500"
                : "bg-secondary",
            )}
          >
            #{currentRank}
          </Badge>
        )}

        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-3">
            {/* Avatar */}
            <Avatar className="h-24 w-24 border-2 border-muted transition-all group-hover:border-primary group-hover:scale-105">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-xl font-semibold bg-primary/10">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div className="text-center space-y-0.5 w-full">
              <h3 className="font-semibold text-base leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                {user.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-1">
                @{user.username}
              </p>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
