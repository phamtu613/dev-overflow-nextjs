import { User } from "@/types";
import Image from "next/image";

interface ProfileStatsProps {
  user: User;
}

export function ProfileStats({ user }: ProfileStatsProps) {
  const stats = [
    {
      label: "Gold Badges",
      value: user.stats.goldBadges,
      icon: "/gold-medal.png",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      label: "Silver Badges",
      value: user.stats.silverBadges,
      icon: "/silver-medal.png",
      color: "bg-gray-100 text-gray-600",
    },
    {
      label: "Bronze Badges",
      value: user.stats.bronzeBadges,
      icon: "/bronze-medal.png",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#11141C] transition pt-9 pr-11 pb-9 pl-11">
      <h2 className="text-xl font-bold text-color-foreground mb-6">Stats</h2>
      <div className="grid grid-cols-4 items-center gap-6">
        <div className="flex gap-x-10 items-center gap-3 rounded-xl py-6 px-10 border border-[#C8CBD954] dark:bg-[#11141C] dark:text-card-foreground dark:border-b-background">
          <div>
            <div className="font-bold text-dark-200">156</div>
            <div className="text-sm text-dark-400">Questions</div>
          </div>
          <div>
            <div className="font-bold text-dark-200">101</div>
            <div className="text-sm text-dark-400">Answers</div>
          </div>
        </div>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 gap-x-5 rounded-xl py-6 px-10 border border-[#C8CBD954] dark:bg-[#11141C] dark:text-card-foreground dark:border-b-background"
          >
            <Image src={stat.icon} alt={stat.label} width={35} height={50} />
            <div>
              <div className="font-bold text-dark-200">{stat.value}</div>
              <div className="text-sm text-dark-400">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
