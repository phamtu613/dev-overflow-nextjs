import { SavedQuestionCard } from "@/components/saved-question-card";
import { questions } from "@/lib/mock-data";

export default function CollectionsPage() {
  // Get first 4 questions as saved questions
  const savedQuestions = questions.slice(0, 4);

  return (
    <div className="px-12 pb-16 flex flex-col gap-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-bold leading-[42px] tracking-[-0.03em] text-dark-100 dark:text-light-900">
          Saved Questions
        </h1>
      </div>

      {/* Question List */}
      <div className="flex flex-col gap-6">
        {savedQuestions.map((question) => (
          <SavedQuestionCard key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
}
