"use client";

import { Button } from "@/components/ui/button";
import { Answer } from "@/types";
import { CheckCircle2 } from "lucide-react";

interface AnswerCardProps {
  answer: Answer;
}

export function AnswerCard({ answer }: AnswerCardProps) {
  return (
    <article className="px-5 pb-9 bg-white dark:bg-[#11141C] transition dark:shadow-[0_0_40px_rgba(0,0,0,0.35)]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1">
          <img
            src={answer.author.avatar || "/placeholder.svg"}
            alt={answer.author.name}
            className="w-8 h-8 rounded-full"
          />
          <div className="text-sm">
            {answer.isAccepted && (
              <div className="flex items-center gap-1 mb-1">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-xs font-medium text-green-600">
                  Accepted Answer
                </span>
              </div>
            )}
            <p className="font-medium text-color-foreground">
              {answer.author.name}
            </p>
            <p className="text-xs text-muted-foreground">
              answered {answer.timestamp}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-light-800 dark:bg-muted rounded-lg p-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <span className="text-lg">▲</span>
          </Button>
          <span className="text-sm font-semibold text-color-foreground w-6 text-center">
            {answer.votes}
          </span>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <span className="text-lg">▼</span>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-color-foreground leading-relaxed whitespace-pre-wrap">
          {answer.content}
        </p>

        {answer.codeSnippet && (
          <div className="bg-light-800 dark:bg-muted rounded-lg overflow-hidden border border-[#DCE3F1] dark:border-border">
            <pre className="p-4 overflow-x-auto text-sm font-mono text-color-foreground">
              <code>{answer.codeSnippet}</code>
            </pre>
          </div>
        )}
      </div>
    </article>
  );
}
