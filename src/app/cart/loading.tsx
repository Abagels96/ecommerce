import { PageContainer } from "@/components/layout/PageContainer";
import { Skeleton } from "@/components/ui/skeleton";

export default function CartLoading() {
  return (
    <PageContainer>
      <div className="max-w-2xl space-y-3">
        <Skeleton className="h-10 w-56 sm:h-11" />
        <Skeleton className="h-4 w-full max-w-lg" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>

      <div className="mt-10 lg:grid lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="space-y-4 lg:col-span-7 xl:col-span-8">
          {[1, 2].map((i) => (
            <div key={i} className="surface-card overflow-hidden p-4 sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Skeleton className="mx-auto aspect-[4/3] w-full max-w-[220px] rounded-xl sm:mx-0 sm:h-24 sm:w-24 sm:max-w-none" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          ))}
        </div>
        <aside className="mt-10 lg:sticky lg:top-24 lg:col-span-5 xl:col-span-4 lg:mt-0">
          <div className="surface-card space-y-4 p-6">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-px w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
