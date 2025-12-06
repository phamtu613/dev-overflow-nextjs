"use client";

import { Button } from "@/components/ui/button";
import { Answer } from "@/types";
import { ChevronDown } from "lucide-react";
import { AnswerCard } from "./answer-card";

interface AnswersSectionProps {
  answers: Answer[];
  totalAnswers: number;
}

export function AnswersSection({ answers, totalAnswers }: AnswersSectionProps) {
  return (
    <div className="space-y-6">
      <div className="px-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-color-foreground">
          {totalAnswers} Answers
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-white dark:bg-transparent border-[#DCE3F1] dark:border-border"
        >
          <span className="text-color-foreground">Highest Upvotes</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-6">
        {answers.map((answer) => (
          <AnswerCard key={answer.id} answer={answer} />
        ))}
      </div>
    </div>
  );
}
