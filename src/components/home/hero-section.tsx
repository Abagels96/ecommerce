import Link from "next/link";

import { buttonClassName } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200/80 bg-gradient-to-b from-zinc-50 via-white to-zinc-100/40 dark:border-zinc-800/80 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900/70">
      <div
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-30"
        aria-hidden
      >
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-500/10" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-500/10" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Local-only MVP
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-zinc-50">
            Desk gear,{" "}
            <span className="bg-gradient-to-r from-violet-600 to-sky-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-sky-400">
              zero friction
            </span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-400">
            A portfolio storefront built with mock data and browser storage — browse
            headphones, keyboards, monitors, and more. No backend, no checkout
            rails — just a fast, modern shopping UI.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="/shop"
              className={buttonClassName({
                variant: "primary",
                size: "lg",
                className: "min-h-12 w-full min-w-[200px] sm:w-auto",
              })}
            >
              Shop the catalog
            </Link>
            <Link
              href="/dashboard"
              className={buttonClassName({
                variant: "outline",
                size: "lg",
                className: "min-h-12 w-full min-w-[200px] sm:w-auto",
              })}
            >
              View dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
