import { Question } from "@/types";
import { QuestionCard } from "./question-card";
interface QuestionListProps {
  questions: Question[];
}

export function QuestionList({ questions }: QuestionListProps) {
  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="text-primary bg-[#FFF1E6] font-medium py-3 px-6 text-sm cursor-pointer rounded-lg"
        >
          Newest
        </button>
        <button
          type="button"
          className="text-muted-foreground bg-[#F4F6F8] px-6 py-3 font-medium hover:text-primary hover:bg-[#FFF1E6] text-sm transition-colors cursor-pointer rounded-lg"
        >
          Active
        </button>
        <button
          type="button"
          className="text-muted-foreground bg-[#F4F6F8] px-6 py-3 font-medium hover:text-primary hover:bg-[#FFF1E6] text-sm transition-colors cursor-pointer rounded-lg"
        >
          Unanswered
        </button>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
}
