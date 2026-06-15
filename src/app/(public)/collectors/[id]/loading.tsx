import { Section } from "@/components/layout/Section";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function PublicCollectorDetailLoading() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <Section className="bg-surface" contained>
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          <div className="w-full md:w-1/3">
            <Skeleton className="w-full aspect-square rounded-[8px]" />
            <div className="mt-6 hidden md:block">
              <Skeleton className="h-12 w-full rounded-[6px]" />
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-6 w-32 rounded-full" />
                <Skeleton className="h-6 w-32 rounded-full" />
              </div>
              <Skeleton className="h-10 w-3/4 mb-2" />
              <Skeleton className="h-6 w-full" />
            </div>

            <Card className="mb-6" variant="default">
              <Skeleton className="h-8 w-48 mb-6 border-b border-border pb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-5 w-48" />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-5 w-48" />
                  </div>
                  <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-5 w-48" />
                  </div>
                </div>
              </div>
            </Card>

            <div className="md:hidden mt-6">
              <Skeleton className="h-12 w-full rounded-[6px]" />
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
