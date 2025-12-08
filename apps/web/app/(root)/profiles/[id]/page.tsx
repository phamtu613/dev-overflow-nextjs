import { ProfileHeader } from "@/components/profile-header";
import { ProfileStats } from "@/components/profile-stats";
import { TopPosts } from "@/components/top-posts";
import { TopTagsSidebar } from "@/components/top-tags-sidebar";
import { userProfile, userTopPosts, userTopTags } from "@/lib/mock-data";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <ProfileHeader user={userProfile} />
      <ProfileStats user={userProfile} />

      <div className="flex gap-6">
        {/* Top Posts */}
        <div className="flex-1 min-w-0">
          <TopPosts posts={userTopPosts} />
        </div>

        {/* Top Tags */}
        <aside className="w-[350px] shrink-0">
          <TopTagsSidebar tags={userTopTags} />
        </aside>
      </div>
    </div>
  );
}
