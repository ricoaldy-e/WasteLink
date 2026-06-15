import { Section } from "@/components/layout/Section";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function PublicCategoryDetailLoading() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <Section className="bg-surface border-b border-border" contained>
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
          <div className="w-full md:w-1/2 lg:w-5/12 shrink-0">
            <Skeleton className="w-full aspect-[4/3] rounded-[8px]" />
          </div>

          <div className="w-full md:w-1/2 lg:w-7/12 flex flex-col pt-2 md:pt-4">
            <Skeleton className="h-6 w-32 rounded-full mb-4" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-5/6 mb-8" />
            
            <Card className="bg-background border border-border" variant="default">
              <Skeleton className="h-6 w-48 mb-4 border-b border-border pb-2" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </Card>
          </div>
        </div>
      </Section>

      <Section contained className="pt-16">
        <div className="mb-10 text-center md:text-left">
          <Skeleton className="h-8 w-64 mb-3 mx-auto md:mx-0" />
          <Skeleton className="h-5 w-80 mx-auto md:mx-0" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} variant="default" className="flex flex-col h-full border border-border">
              <div className="flex justify-between items-start mb-4">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <div className="flex items-start gap-2 mb-6">
                <Skeleton className="w-5 h-5 shrink-0 rounded-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="mt-auto pt-4 border-t border-border">
                <Skeleton className="h-10 w-full" />
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
