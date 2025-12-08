import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function UserGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <Card key={i} className="p-0">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-3">
              <Skeleton className="h-24 w-24 rounded-full" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
