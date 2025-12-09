import { CommunityContent } from "./_components/CommunityContent";

export const metadata = {
  title: "All Users - DevOverflow",
  description: "Browse all community members",
};

export default function CommunityPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">All Users</h1>
      </header>

      <CommunityContent />
    </div>
  );
}
