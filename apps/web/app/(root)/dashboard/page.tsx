import { Header } from "@/components/shared/header";
import LeftSidebar from "@/components/shared/left-sidebar";
import RightSidebar from "@/components/shared/right-sidebar";
import { SavedQuestionCard } from "@/components/saved-question-card";
import { QuestionList } from "@/components/question-list";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { QuestionMetrics } from "@/components/shared/question-metrics";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-12 gap-6">
        
        {/* Left Sidebar */}
        <aside className="hidden md:block md:col-span-3 lg:col-span-2">
          <LeftSidebar />
        </aside>

        {/* Main Content */}
        <main className="col-span-12 md:col-span-6 lg:col-span-7 space-y-10">
          {/* Question Search*/}
          
          {/* Question List */}
          <QuestionList questions={[]} /> 
          {/* Saved Question */}
          <SavedQuestionCard
            question={{
              id: "1",
              title: "Sample Question",
              content: "This is a sample question.",
              tags: [],
              author: {
                name: "John Doe",
                avatar: "/avatar.png",
              },
              timestamp: "2 hours ago",
              votes: 10,
              answers: 5,
              views: 100,
              label: "Sample Label",
            }}
          />


        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
}