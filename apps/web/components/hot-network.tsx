import type { HotItem } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface HotNetworkProps {
  items: HotItem[];
}

export function HotNetwork({ items }: HotNetworkProps) {
  return (
    <div className="border border-slate-200/80 p-6">
      <h2 className="mb-1 text-lg font-semibold tracking-tight text-slate-950">
        Hot Network
      </h2>
      <p className="mb-5 text-sm leading-6 text-slate-500">
        Fast-moving conversations from across the wider network.
      </p>
      <div className="space-y-4">
        {items.map((item, index) => (
          <Link
            key={item.id}
            href={`/ask-question/${item.slug}-${item.id}`}
            className="flex items-start gap-3 rounded-2xl px-3 py-3 transition hover:bg-orange-50"
          >
            <div className="shrink-0 mt-0.5">
              <Image
                src={
                  index % 2 === 0
                    ? "/question-orange.png"
                    : "/question-blue.png"
                }
                alt={item.title}
                className="size-5"
                width={20}
                height={20}
              />
            </div>
            <div className="min-w-0">
              <p className="line-clamp-2 text-sm font-medium leading-6 text-slate-700 transition hover:text-orange-500">
                {item.title}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                network highlight
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
