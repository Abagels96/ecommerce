import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

/** Subtle pulse; respects reduced motion via Tailwind. */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-zinc-200/90 motion-reduce:animate-none dark:bg-zinc-800/90",
        className,
      )}
      {...props}
    />
  );
}
