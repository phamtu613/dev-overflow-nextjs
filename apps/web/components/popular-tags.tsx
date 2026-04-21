import type { PopularTag } from "@/types";
import Image from "next/image";

interface PopularTagsProps {
  tags: PopularTag[];
}

export function PopularTags({ tags }: PopularTagsProps) {
  return (
    <div className="border border-slate-200/80 p-6">
      <h2 className="mb-1 text-lg font-semibold tracking-tight text-slate-950">
        Popular Tags
      </h2>
      <p className="mb-5 text-sm leading-6 text-slate-500">
        Tags with strong activity and consistent question volume.
      </p>
      <div className="space-y-3">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-3 py-3 transition hover:border-orange-100 hover:bg-orange-50"
          >
            <div className="flex items-center gap-3">
              <Image
                src={tag.icon}
                alt={tag.name}
                className="size-3.5"
                width={16}
                height={16}
              />
              <span className="text-sm font-semibold text-slate-700">
                {tag.name}
              </span>
            </div>
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-500">
              {tag.count.toLocaleString()}+
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
