import { QuestionForm } from "@/components/question-form";

export default function ProfileAskQuestionPage() {
  return (
    <div className="max-w-4xl px-6 pb-10">
      <QuestionForm mode="create" />
    </div>
  );
}
