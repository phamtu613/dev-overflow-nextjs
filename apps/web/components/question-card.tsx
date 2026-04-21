import type { Question } from "@/types";
import { QuestionMetrics } from "@/components/shared/question-metrics";
import { Badge } from "@repo/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <article className="group rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_44px_rgba(148,163,184,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_52px_rgba(249,115,22,0.14)] md:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-wrap gap-2">
            {question.tags.map((tag) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-orange-600 hover:bg-orange-100"
              >
                {tag.name}
              </Badge>
            ))}
          </div>

          <Link
            href={`/ask-question/${question.slug}-${question.id}`}
            className="line-clamp-2 text-lg font-semibold tracking-tight text-slate-900 transition group-hover:text-orange-500 md:text-[22px]"
          >
            {question.title}
          </Link>
          <p className="mt-3 line-clamp-2 max-w-3xl text-sm leading-6 text-slate-500">
            {question.excerpt}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="overflow-hidden rounded-2xl ring-2 ring-orange-100">
            <Image
            src={question.author.avatar || "/avatar.png"}
            alt={question.author.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-2xl object-cover"
          />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 transition group-hover:text-orange-500">
              {question.author.name}
            </p>
            <p className="text-xs text-slate-400">asked {question.timestamp}</p>
          </div>
        </div>

        <QuestionMetrics
          votes={question.votes}
          answers={question.answer}
          views={question.views}
          variant="default"
          className="justify-start lg:justify-end"
        />
      </div>
    </article>
  );
}
