import { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MetricProps {
  icon?: LucideIcon;
  imgUrl?: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
}

export const Metric = ({
  icon: Icon,
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  isAuthor,
}: MetricProps) => {
  const content = (
    <>
      {Icon ? (
        <Icon className="size-4 text-dark-400 dark:text-light-700" />
      ) : imgUrl ? (
        <Image
          src={imgUrl}
          width={16}
          height={16}
          alt={alt}
          className={`object-contain ${href ? "rounded-full" : ""}`}
        />
      ) : null}
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        <span
          className={`line-clamp-1 text-xs ${isAuthor ? "max-sm:hidden" : ""}`}
        >
          {title}
        </span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center justify-center gap-1">
        {content}
      </Link>
    );
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      {content}
    </div>
  );
};
