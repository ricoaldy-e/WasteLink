import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-background">
      <Section className="pb-8 pt-8 lg:pt-12">
        <div className="mb-10">
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-6 w-full max-w-2xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="flex flex-col">
            <Skeleton className="h-4 w-32 mb-4" />
            <Skeleton className="h-14 w-24" />
          </Card>
          <Card className="flex flex-col">
            <Skeleton className="h-4 w-32 mb-4" />
            <Skeleton className="h-14 w-24" />
          </Card>
        </div>

        <div>
          <Skeleton className="h-8 w-40 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="flex flex-col">
              <Skeleton className="w-12 h-12 rounded-full mb-4" />
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-full mb-6" />
              <Skeleton className="h-4 w-24" />
            </Card>
            <Card className="flex flex-col">
              <Skeleton className="w-12 h-12 rounded-full mb-4" />
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-full mb-6" />
              <Skeleton className="h-4 w-24" />
            </Card>
          </div>
        </div>
      </Section>
    </main>
  );
}
