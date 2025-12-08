import { AnswersSection } from "@/components/answers-section";
import { QuestionDetail } from "@/components/question-detail";
import { detailedQuestion } from "@/lib/mock-data";

export default function QuestionsPage() {
  return (
    <div className="flex-1 min-w-0 space-y-8">
      {/* Question Detail */}
      <QuestionDetail question={detailedQuestion} />

      {/* Answers Section */}
      <AnswersSection
        answers={detailedQuestion.answers}
        totalAnswers={detailedQuestion.answer}
      />
    </div>
  );
}
