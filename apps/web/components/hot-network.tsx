import { HotItem } from "@/types";
import Image from "next/image";

interface HotNetworkProps {
  items: HotItem[];
}

export function HotNetwork({ items }: HotNetworkProps) {
  return (
    <div className="dark:bg-card border border-[#C8CBD954] dark:border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-color-foreground mb-4">
        Hot Network
      </h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="flex items-start gap-3 hover:opacity-80 cursor-pointer transition-opacity"
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
            <p className="text-sm text-color-foreground line-clamp-2 hover:text-primary transition-colors">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
