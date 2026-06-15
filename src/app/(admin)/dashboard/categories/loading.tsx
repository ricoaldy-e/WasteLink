import { Section } from "@/components/layout/Section";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function AdminCategoriesLoading() {
  return (
    <Section className="py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-80" />
        </div>
        <Skeleton className="h-10 w-48" />
      </div>

      {/* List Skeleton */}
      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Thumbnail */}
            <Skeleton className="shrink-0 w-16 h-16 rounded-[6px]" />
            
            {/* Info */}
            <div className="flex-1 w-full space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-full max-w-md" />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center mt-2 sm:mt-0">
              <Skeleton className="h-9 w-16 rounded-[6px]" />
              <Skeleton className="h-9 w-16 rounded-[6px]" />
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
