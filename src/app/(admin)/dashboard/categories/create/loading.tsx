import { Section } from "@/components/layout/Section";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function CategoryFormLoading() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Section className="pt-8 pb-12 lg:pt-12">
        <div className="mb-8">
          <Skeleton className="h-7 w-32 mb-4" /> {/* Back button */}
          <Skeleton className="h-8 w-64 mb-2" /> {/* Title */}
          <Skeleton className="h-4 w-96 max-w-full" /> {/* Subtitle */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:hidden col-span-1">
            <Card className="bg-white border border-border rounded-[8px] p-6 shadow-sm">
              <Skeleton className="h-4 w-32 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-4/6" />
              </div>
            </Card>
          </div>

          <div className="lg:col-span-8 flex flex-col">
            <Card className="bg-white border border-border rounded-[8px] p-6 shadow-sm flex flex-col gap-6 h-full flex-1">
              <div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-10 w-full" /></div>
              <div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-24 w-full" /></div>
              <div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-32 w-full" /></div>
            </Card>
          </div>

          <div className="lg:col-span-4 flex flex-col">
            <Card className="bg-white border border-border rounded-[8px] p-6 shadow-sm flex flex-col justify-between h-full flex-1 gap-6">
               <div className="hidden lg:block border-b border-border pb-6">
                 <Skeleton className="h-4 w-32 mb-4" />
                 <div className="space-y-2">
                   <Skeleton className="h-3 w-full" />
                   <Skeleton className="h-3 w-5/6" />
                   <Skeleton className="h-3 w-4/6" />
                 </div>
               </div>
               <Skeleton className="h-48 w-full" />
            </Card>
          </div>

          <div className="lg:col-span-12 flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-border mt-4">
             <Skeleton className="h-[44px] w-full sm:w-[180px] rounded-[6px]" />
             <Skeleton className="h-[44px] w-full sm:w-[180px] rounded-[6px]" />
          </div>
        </div>
      </Section>
    </main>
  );
}
