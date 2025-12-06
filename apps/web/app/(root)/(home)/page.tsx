import { QuestionList } from "@/components/question-list";
import { Button } from "@/components/ui/button";
import { questions } from "@/lib/mock-data";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1">
      {/* Section header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-color-foreground">
          All Questions
        </h1>
        <Link href="/ask-question">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Ask a Question
          </Button>
        </Link>
      </div>

      {/* Search bar for questions */}
      <div className="mb-8">
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
