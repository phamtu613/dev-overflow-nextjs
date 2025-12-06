import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Props {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

export const RenderTag = ({ _id, name, totalQuestions, showCount }: Props) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
      <Badge className="rounded-md border-none bg-light-800 px-4 py-2 text-[10px] font-medium uppercase text-light-400 dark:bg-dark-300 dark:text-light-500">
        {name}
      </Badge>
      {showCount && (
        <p className="text-sm font-medium text-dark-500 dark:text-light-700">
          {totalQuestions}
        </p>
      )}
    </Link>
  );
};
