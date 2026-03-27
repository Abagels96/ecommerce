import { PageContainer } from "@/components/layout/PageContainer";
import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutLoading() {
  return (
    <PageContainer>
      <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="space-y-5 lg:col-span-7">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-full max-w-lg" />
          <div className="mt-10 space-y-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-11 w-full" />
            ))}
            <div className="flex gap-4 pt-2">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </div>
        <aside className="mt-12 lg:sticky lg:top-24 lg:col-span-5 lg:mt-0">
          <div className="surface-card space-y-4 p-6">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-px w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
