import { Eye, MessageCircle, ThumbsUp } from "lucide-react";
import { cn } from "@repo/utils/cn";

interface QuestionMetricsProps {
  votes: number;
  answers: number;
  views: number;
  variant?: "default" | "compact";
  className?: string;
}

export function QuestionMetrics({
  votes,
  answers,
  views,
  variant = "default",
  className,
}: QuestionMetricsProps) {
  const metrics = [
    { icon: ThumbsUp, value: votes, label: "Votes" },
    { icon: MessageCircle, value: answers, label: "Answers" },
    { icon: Eye, value: views, label: "Views" },
  ];

  return (
    <div className={cn("flex items-center", className)}>
      {metrics.map(({ icon: Icon, value, label }) => (
        <div
          key={label}
          className={cn(
            "flex items-center cursor-pointer transition-opacity hover:opacity-80",
            variant === "default" ? "gap-1 mr-6 last:mr-0" : "gap-0.5 mr-2.5 last:mr-0"
          )}
        >
          <Icon
            className={cn(
              "shrink-0",
              variant === "default"
                ? "size-4 text-[#1DA1F2]"
                : "w-4 h-4 text-light-900 dark:text-light-800"
            )}
          />
          <span
            className={cn(
              "text-xs",
              variant === "default"
                ? "text-color-foreground"
                : "leading-[15.6px] text-dark-400 dark:text-light-700"
            )}
          >
            {value.toLocaleString()}
            {variant === "default" && (
              <span className="text-xs text-color-muted ml-1">{label}</span>
            )}
            {variant === "compact" && ` ${label}`}
          </span>
        </div>
      ))}
    </div>
  );
}

