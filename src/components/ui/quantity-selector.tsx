"use client";

import { useId } from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";

export type QuantitySelectorProps = {
  value: number;
  onValueChange: (next: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  id?: string;
  name?: string;
  /** Visible label for the group (also used for aria-label on the wrapper). */
  label?: string;
  className?: string;
  size?: "sm" | "md";
};

function MinusIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M3 7h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M7 3v8M3 7h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function QuantitySelector({
  value,
  onValueChange,
  min = 1,
  max,
  disabled,
  id: idProp,
  name,
  label = "Quantity",
  className,
  size = "md",
}: QuantitySelectorProps) {
  const uid = useId();
  const baseId = idProp ?? `qty-${uid}`;
  const inputId = `${baseId}-input`;

  const atMin = value <= min;
  const atMax = max !== undefined && value >= max;

  const commit = (raw: number) => {
    if (Number.isNaN(raw) || raw < min) {
      onValueChange(min);
      return;
    }
    if (max !== undefined && raw > max) {
      onValueChange(max);
      return;
    }
    onValueChange(Math.floor(raw));
  };

  const btnSize = size === "sm" ? "sm" : "md";
  const inputPad = size === "sm" ? "h-8 w-10 text-xs" : "h-10 w-12 text-sm";

  return (
    <div
      className={cn("inline-flex flex-col gap-1.5", className)}
      role="group"
      aria-label={label}
    >
      <span id={`${baseId}-label`} className="sr-only">
        {label}
      </span>
      <div className="flex items-stretch gap-1">
        <Button
          type="button"
          variant="outline"
          size={btnSize}
          disabled={disabled || atMin}
          className="min-w-9 px-0"
          aria-controls={inputId}
          aria-label="Decrease quantity"
          onClick={() => commit(value - 1)}
        >
          <MinusIcon />
        </Button>
        <input
          id={inputId}
          name={name}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          disabled={disabled}
          aria-labelledby={`${baseId}-label`}
          className={cn(
            "rounded-lg border border-zinc-300 bg-white text-center font-medium text-zinc-900 tabular-nums transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus-visible:outline-zinc-500",
            inputPad,
          )}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (e.target.value === "") return;
            commit(n);
          }}
          onBlur={() => commit(value)}
        />
        <Button
          type="button"
          variant="outline"
          size={btnSize}
          disabled={disabled || atMax}
          className="min-w-9 px-0"
          aria-controls={inputId}
          aria-label="Increase quantity"
          onClick={() => commit(value + 1)}
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
}
