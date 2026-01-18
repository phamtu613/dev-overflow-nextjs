import { QuestionCard } from "./question-card";
interface QuestionListProps {
  questions: any[];
}

export function QuestionList({ questions }: QuestionListProps) {
  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="text-primary-500 bg-light-800 dark:bg-dark-300 font-medium py-3 px-6 text-sm cursor-pointer rounded-lg shadow-none"
        >
          Newest
        </button>
        <button
          type="button"
          className="text-light-500 bg-light-800 dark:bg-dark-300 px-6 py-3 font-medium hover:text-primary-500 text-sm transition-colors cursor-pointer rounded-lg shadow-none"
        >
          Recommended Questions
        </button>
        <button
          type="button"
          className="text-light-500 bg-light-800 dark:bg-dark-300 px-6 py-3 font-medium hover:text-primary-500 text-sm transition-colors cursor-pointer rounded-lg shadow-none"
        >
          Frequent
        </button>
        <button
          type="button"
          className="text-light-500 bg-light-800 dark:bg-dark-300 px-6 py-3 font-medium hover:text-primary-500 text-sm transition-colors cursor-pointer rounded-lg shadow-none"
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
