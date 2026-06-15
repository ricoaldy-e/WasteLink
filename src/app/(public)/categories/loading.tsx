import { Section } from "@/components/layout/Section";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function PublicCategoriesLoading() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <Section contained>
        {/* Header Skeleton */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-full mx-auto" />
          <Skeleton className="h-6 w-3/4 mx-auto mt-2" />
        </div>

        {/* Categories Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} variant="default" className="flex flex-col h-full border border-border shadow-sm">
              <Skeleton className="w-full aspect-[4/3] rounded-t-[8px] rounded-b-none" />
              <div className="p-6 flex-1 flex flex-col">
                <Skeleton className="h-6 w-48 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-6" />
                <div className="mt-auto pt-4 border-t border-border">
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
