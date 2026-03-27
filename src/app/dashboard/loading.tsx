import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <Skeleton className="h-9 w-48 sm:h-10" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <li key={i}>
            <div className="surface-card h-36 p-6">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="mt-4 h-10 w-20" />
            </div>
          </li>
        ))}
      </ul>
      <div className="surface-card h-64 p-6">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="mt-6 h-4 w-full" />
        <Skeleton className="mt-3 h-4 w-5/6" />
      </div>
    </div>
  );
}
