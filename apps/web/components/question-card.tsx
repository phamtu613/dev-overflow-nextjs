import { Badge } from "@/components/ui/badge";
import { Question } from "@/types";
import { Eye, MessageCircle, ThumbsUp } from "lucide-react";

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <article className="border p-9 rounded-xl border-[#C8CBD954] dark:bg-[#11141C] dark:text-card-foreground dark:border-b-background text-color-foreground bg-color-background dark:border-border transition dark:shadow-[0_0_40px_rgba(0,0,0,0.35)] hover:shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-color-foreground mb-2 line-clamp-2 hover:text-primary cursor-pointer transition-colors">
            {question.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {question.excerpt}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {question.tags.map((tag) => (
          <Badge
            key={tag.id}
            variant="secondary"
            className="bg-light-800 text-color-foreground hover:bg-muted/80 cursor-pointer"
          >
            {tag.name}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={question.author.avatar || "/placeholder.svg"}
            alt={question.author.name}
            className="w-6 h-6 rounded-full"
          />
          <div className="flex items-center">
            <p className="text-sm font-medium text-color-foreground hover:text-primary cursor-pointer transition-colors">
              {question.author.name}
            </p>
            <p className="text-xs pl-2">• asked {question.timestamp}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 text-xs hover:text-foreground cursor-pointer transition-colors">
            <ThumbsUp className="size-4 text-[#1DA1F2]" />
            <span>{question.votes.toLocaleString()}</span>
            <span className="text-xs text-color-muted">Votes</span>
          </div>
          <div className="flex items-center gap-1 text-xs hover:text-foreground cursor-pointer transition-colors">
            <MessageCircle className="size-4 text-[#1DA1F2]" />
            <span>{question.answer.toLocaleString()}</span>
            <span className="text-xs text-color-muted">Answers</span>
          </div>
          <div className="flex items-center gap-1 text-xs hover:text-foreground cursor-pointer transition-colors">
            <Eye className="size-4 text-[#1DA1F2]" />
            <span>{question.views.toLocaleString()}</span>
            <span className="text-xs text-color-muted">Views</span>
          </div>
        </div>
      </div>
    </article>
  );
}
