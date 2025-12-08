"use client";

import { Badge } from "@/components/ui/badge";
import { Answer, Question } from "@/types";
import { Eye, MessageCircle, ThumbsUp } from "lucide-react";

interface QuestionDetailProps {
  question: Question & { answers: Answer[] };
}

export function QuestionDetail({ question }: QuestionDetailProps) {
  return (
    <div className="space-y-8">
      <div className="px-5 pb-9 bg-white dark:bg-[#11141C] transition dark:shadow-[0_0_40px_rgba(0,0,0,0.35)]">
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-2xl font-bold text-color-foreground leading-tight">
              {question.title}
            </h1>
          </div>

          <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#DCE3F1] dark:border-border">
            <div className="flex items-center gap-3">
              <img
                src={question.author.avatar || "/placeholder.svg"}
                alt={question.author.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="text-sm">
                <p className="font-medium text-color-foreground">
                  {question.author.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  asked {question.timestamp}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-[#1DA1F2]" />
                <span className="text-color-foreground">
                  {question.votes.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">Votes</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#1DA1F2]" />
                <span className="text-color-foreground">
                  {question.answers.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">Answers</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#1DA1F2]" />
                <span className="text-color-foreground">
                  {question.views.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">Views</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 space-y-4">
          <p className="text-color-foreground leading-relaxed whitespace-pre-wrap">
            {question.content}
          </p>

          {question.codeSnippet && (
            <div className="bg-light-800 dark:bg-muted rounded-lg overflow-hidden border border-[#DCE3F1] dark:border-border">
              <pre className="p-4 overflow-x-auto text-sm font-mono text-color-foreground">
                <code>{question.codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {question.tags.map((tag) => (
            <Badge
              key={tag.id}
              variant="secondary"
              className="bg-light-800 text-color-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
