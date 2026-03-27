import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-zinc-900 text-white shadow-sm hover:bg-zinc-800 hover:shadow-md active:bg-zinc-950 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:active:bg-zinc-50",
  secondary:
    "bg-zinc-100 text-zinc-900 shadow-sm hover:bg-zinc-200/90 active:bg-zinc-300/80 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:active:bg-zinc-600",
  outline:
    "border border-zinc-300/90 bg-transparent text-zinc-900 shadow-sm hover:border-zinc-400 hover:bg-zinc-50/80 active:bg-zinc-100/80 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-zinc-900/60 dark:active:bg-zinc-900",
  ghost:
    "bg-transparent text-zinc-700 hover:bg-zinc-100/90 active:bg-zinc-200/80 dark:text-zinc-300 dark:hover:bg-zinc-800/80 dark:active:bg-zinc-800",
  danger:
    "bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow active:bg-red-800 dark:bg-red-600 dark:hover:bg-red-500",
} as const;

const sizes = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
} as const;

const baseButton =
  "inline-flex items-center justify-center rounded-lg font-medium transition-[color,box-shadow,transform,background-color] duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100 dark:focus-visible:outline-zinc-500";

/** Use with `next/link` or `<a>` when you need the same styles as `Button`. */
export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return cn(baseButton, variants[variant], sizes[size], className);
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = "primary",
      size = "md",
      type = "button",
      disabled,
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={buttonClassName({ variant, size, className })}
        {...props}
      />
    );
  },
);
