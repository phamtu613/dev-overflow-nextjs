"use client";

import { Badge } from "@repo/ui/badge";
import { QuestionMetrics } from "@/components/shared/question-metrics";
import { Question } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface SavedQuestionCardProps {
  question: Question;
}

export function SavedQuestionCard({ question }: SavedQuestionCardProps) {
  return (
    <article className="border border-light-border-color bg-light-900 dark:bg-dark-200 rounded-[10px] p-9 shadow-[0px_12px_20px_0px_rgba(184,184,184,0.03),0px_6px_12px_0px_rgba(184,184,184,0.02),0px_2px_4px_0px_rgba(184,184,184,0.03)] dark:shadow-none transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-3.5">
        {/* Header with title and edit/delete */}
        <div className="flex flex-col gap-3.5">
          <div className="flex items-start justify-between gap-3.5">
            <Link
              href={`/ask-question/${question.slug}-${question.id}`}
              className="text-xl font-semibold leading-[24.8px] text-dark-200 dark:text-light-900 max-w-[618px] hover:text-primary cursor-pointer transition-colors"
            >
              {question.title}
            </Link>
            <Image
              src="/assets/icons/edit-delete.svg"
              alt="Edit or delete"
              width={44}
              height={18}
              className="shrink-0 cursor-pointer"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {question.tags.map((tag) => (
              <Badge
                key={tag.id}
                className="bg-light-800 dark:bg-dark-300 text-light-400 dark:text-light-500 uppercase text-[10px] font-medium leading-[13px] px-4 py-2 rounded-md hover:bg-light-700 dark:hover:bg-dark-400 cursor-pointer transition-colors"
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-7">
          {/* Author info */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1">
              <div className="relative w-5 h-5 rounded-full overflow-hidden">
                <Image
                  src={question.author.avatar || "/avatar.png"}
                  alt={question.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium leading-[18.2px] text-dark-400 dark:text-light-700">
                {question.author.name}
              </span>
            </div>
            <span className="text-xs leading-[15.6px] text-dark-400 dark:text-light-700">
              • asked {question.timestamp}
            </span>
          </div>

          {/* Actions */}
          <QuestionMetrics
            votes={question.votes}
            answers={question.answer}
            views={question.views}
            variant="compact"
          />
        </div>
      </div>
    </article>
  );
}
