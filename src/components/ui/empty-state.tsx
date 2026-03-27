import { useId } from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type EmptyStateProps = {
  title: string;
  description?: string;
  /** Optional icon or illustration (decorate with aria-hidden on non-meaningful icons). */
  icon?: ReactNode;
  /** Primary actions, links, or buttons. */
  children?: ReactNode;
  className?: string;
  /** Heading DOM id for `aria-labelledby` on the region. */
  id?: string;
};

export function EmptyState({
  title,
  description,
  icon,
  children,
  className,
  id: idProp,
}: EmptyStateProps) {
  const uid = useId();
  const titleId = idProp ?? `empty-state-title-${uid}`;

  return (
    <section
      role="region"
      aria-labelledby={titleId}
      className={cn(
        "surface-muted flex flex-col items-center justify-center border-dashed px-5 py-14 text-center sm:px-8 sm:py-16",
        className,
      )}
    >
      {icon ? (
        <div
          className="mb-5 text-zinc-400 transition-colors dark:text-zinc-500"
          aria-hidden
        >
          {icon}
        </div>
      ) : null}
      <h2
        id={titleId}
        className="text-balance text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl dark:text-zinc-50"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      ) : null}
      {children ? (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {children}
        </div>
      ) : null}
    </section>
  );
}
