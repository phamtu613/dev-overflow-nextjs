import { QuestionList } from "@/components/question-list";
import { questions } from "@/lib/mock-data";
import { Button } from "@repo/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();
  console.log(userId);
  if (!userId) redirect("/sign-in");

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-semibold text-white">
          All Questions
        </h1>

        <Link href="/ask-question" className="max-sm:w-full">
          <Button
            className="
              w-full sm:w-auto
              min-h-[46px]
              px-6
              rounded-xl
              bg-[#F2994A]
              text-black
              font-medium
              hover:bg-[#f3a45c]
            "
          >
            Ask a Question
          </Button>
        </Link>
      </div>

      {/* SEARCH */}
      <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <div className="relative w-full max-w-[620px]">

          <div
            className="
              flex min-h-[56px]
              items-center gap-3
              rounded-xl
              bg-[#0f172a]/80
              border border-white/10
              px-5
              shadow-lg
            "
          >
            {/* <Search
              size={20}
              className="text-slate-400"
            /> */}

            <input
              type="text"
              placeholder="Search for Questions Here..."
              className="
                w-full
                bg-transparent
                text-white
                placeholder:text-slate-400
                outline-none
              "
            />
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-6">
        <QuestionList questions={questions} />
      </div>

    </div>
  );
}
