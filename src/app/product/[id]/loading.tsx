import { PageContainer } from "@/components/layout/PageContainer";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <PageContainer>
      <Skeleton className="h-4 w-64 max-w-full" />
      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-12">
        <Skeleton className="aspect-square w-full rounded-2xl" />
        <div className="space-y-4">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-10 w-full max-w-md" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
