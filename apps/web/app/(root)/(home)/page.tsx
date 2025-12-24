import { QuestionList } from "@/components/question-list";
import { Button } from "@/components/ui/button";
import { questions } from "@/lib/mock-data";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-12 pb-16 flex flex-col gap-10">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold leading-[42px] tracking-[-0.03em] text-dark-100 dark:text-light-900">
          All Questions
        </h1>
        <Link href="/ask-question">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Ask a Question
          </Button>
        </Link>
      </div>

      {/* Search bar for questions */}
      <div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for Questions Here..."
            className="w-full px-4 py-3 dark:bg-muted border border-[#DCE3F1] dark:border-border rounded-lg text-color-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>

      <QuestionList questions={questions} />
    </div>
  );
}
