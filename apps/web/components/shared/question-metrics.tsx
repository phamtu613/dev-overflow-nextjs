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
    { icon: ThumbsUp, value: Number(votes || 0), label: "Votes" },
    { icon: MessageCircle, value: Number(answers || 0), label: "Answers" },
    { icon: Eye, value: Number(views || 0), label: "Views" },
  ];

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 text-slate-500",
        className
      )}
    >
      {metrics.map(({ icon: Icon, value, label }) => (
        <div
          key={label}
          className={cn(
            "flex items-center rounded-full transition",
            variant === "default"
              ? "gap-1.5 bg-slate-50 px-3 py-1.5 hover:bg-orange-50"
              : "gap-1 px-2 py-1 hover:bg-slate-100"
          )}
        >
          <Icon
            className={cn(
              "shrink-0",
              variant === "default"
                ? "size-4 text-orange-500"
                : "h-4 w-4 text-slate-500"
            )}
          />
          <span
            className={cn(
              "text-xs font-medium",
              variant === "default"
                ? "text-slate-700"
                : "leading-[15.6px] text-slate-500"
            )}
          >
            {value.toLocaleString()}
            {variant === "default" && (
              <span className="ml-1 text-xs text-slate-400">{label}</span>
            )}
            {variant === "compact" && ` ${label}`}
          </span>
        </div>
      ))}
    </div>
  );
}
