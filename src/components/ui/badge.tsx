import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const variants = {
  default:
    "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100",
  primary:
    "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
  success:
    "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100",
  warning:
    "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100",
  destructive:
    "bg-red-100 text-red-900 dark:bg-red-900/40 dark:text-red-100",
  outline:
    "border border-zinc-300 bg-transparent text-zinc-700 dark:border-zinc-600 dark:text-zinc-300",
} as const;

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-xs",
  lg: "px-3 py-1 text-sm",
} as const;

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap transition-colors duration-200",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
