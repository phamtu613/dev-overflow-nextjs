"use client";

import { QuestionForm } from "@/components/question-form";
import { useParams } from "next/navigation";

// Mock data - In production, this would come from an API
const mockQuestionData = {
  title: "How to implement authentication in Next.js 14 with Clerk?",
  explanation:
    "I'm trying to implement authentication in my Next.js 14 application using Clerk. I've followed the documentation but I'm running into issues with the middleware configuration. The sign-in page works fine, but after successful authentication, users are not being redirected to the dashboard as expected.\n\nHere's my current middleware configuration:\n\n```typescript\nimport { clerkMiddleware } from '@clerk/nextjs/server';\n\nexport default clerkMiddleware();\n\nexport const config = {\n  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']\n};\n```\n\nWhat am I missing? How can I properly configure the redirect after authentication?",
  tags: "nextjs, clerk, authentication, middleware",
};

export default function ProfileAskQuestionEditPage() {
  const params = useParams();
  const questionId = params.id as string;

  // In production, fetch question data based on questionId
  // For now, using mock data
  const questionData = mockQuestionData;

  return (
    <div className="max-w-4xl px-6 pb-10">
      <QuestionForm
        mode="edit"
        questionId={questionId}
        initialData={questionData}
      />
    </div>
  );
}
