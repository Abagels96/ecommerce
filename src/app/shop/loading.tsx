import { PageContainer } from "@/components/layout/PageContainer";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShopLoading() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
        <Skeleton className="h-5 w-24" />
      </div>

      <div className="surface-muted mt-8 space-y-4 p-4 sm:p-6">
        <Skeleton className="h-11 w-full max-w-xl" />
        <div className="flex flex-col gap-4 sm:flex-row">
          <Skeleton className="h-10 w-full sm:max-w-xs" />
          <Skeleton className="h-10 w-full sm:max-w-xs" />
        </div>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="min-w-0">
            <div className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white dark:border-zinc-800 dark:bg-zinc-950">
              <Skeleton className="aspect-[4/3] w-full rounded-none" />
              <div className="space-y-3 p-4 sm:p-5">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-5 w-1/4" />
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-9 flex-1" />
                  <Skeleton className="h-9 flex-1" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </PageContainer>
  );
}
