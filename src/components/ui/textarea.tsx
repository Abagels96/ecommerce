import { forwardRef, useId } from "react";
import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  hint?: string;
  inputClassName?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      className,
      inputClassName,
      label,
      error,
      hint,
      id: idProp,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      disabled,
      rows = 3,
      ...props
    },
    ref,
  ) {
    const uid = useId();
    const id = idProp ?? `textarea-${uid}`;
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy =
      [ariaDescribedBy, hintId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className={cn("w-full", className)}>
        {label ? (
          <label
            htmlFor={id}
            className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            {label}
          </label>
        ) : null}
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          disabled={disabled}
          aria-invalid={ariaInvalid ?? (error ? true : undefined)}
          aria-describedby={describedBy}
          className={cn(
            "w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm transition-[border-color,box-shadow] duration-200 placeholder:text-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus-visible:outline-zinc-500",
            error &&
              "border-red-500 focus-visible:outline-red-500 dark:border-red-500",
            inputClassName,
          )}
          {...props}
        />
        {hint && !error ? (
          <p
            id={hintId}
            className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400"
          >
            {hint}
          </p>
        ) : null}
        {error ? (
          <p
            id={errorId}
            role="alert"
            className="mt-1.5 text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
