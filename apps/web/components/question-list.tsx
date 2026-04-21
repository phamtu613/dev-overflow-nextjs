import type { Question } from "@/types";
import { QuestionCard } from "./question-card";

interface QuestionListProps {
  questions: Question[];
}

export function QuestionList({ questions }: QuestionListProps) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(249,115,22,0.22)]"
        >
          Newest
        </button>
        <button
          type="button"
          className="rounded-full bg-slate-100 px-5 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-orange-50 hover:text-orange-500"
        >
          Active
        </button>
        <button
          type="button"
          className="rounded-full bg-slate-100 px-5 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-orange-50 hover:text-orange-500"
        >
          Unanswered
        </button>
        <div className="ml-auto hidden text-sm text-slate-400 md:block">
          {questions.length} threads available
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
}
