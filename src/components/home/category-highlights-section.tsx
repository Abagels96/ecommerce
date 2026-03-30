"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { getMergedProducts } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

/** Matches `category` values in `src/data/products.ts`. */
const CATEGORY_ORDER = [
  "moms",
  "baby",
  "kitchen",
  "laptops",
  "bedroom",
  "car",
] as const;

function countByCategory(source: Product[], category: string): number {
  return source.filter((p) => p.category === category).length;
}

function IconShirt() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 3L6 6v4l3 2v9h6v-9l3-2V6l-3-3h-1.5L12 5l-1.5-2H9z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconOnesie() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3v3M9 5l-2 3v12a2 2 0 002 2h6a2 2 0 002-2V8l-2-3-3-2-3 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l1.09 3.36H17l-2.91 2.12 1.11 3.42L12 11.77 8.8 11.9l1.11-3.42L7 6.36h3.91L12 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M5 20l1.5-1M19 20l-1.5-1M12 14v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMonitor() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="4"
        width="18"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 20h8M12 16v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMoonSleep() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 14.5A8.5 8.5 0 0112.5 6a8.5 8.5 0 008.5 8.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M6 18l1-1M4 14h2M8 14h1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconCar() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 11l1.5-3h11L19 11v6H5v-6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="17" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="17" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 11h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const META = {
  moms: {
    label: "For moms",
    blurb: "Totes, self-care, accessories, and everyday essentials.",
    icon: <IconShirt />,
    iconBox:
      "bg-pink-500/15 text-pink-800 ring-pink-500/20 dark:bg-pink-500/10 dark:text-pink-300 dark:ring-pink-500/20",
    cardAccent:
      "hover:border-pink-300/60 dark:hover:border-pink-700/50 bg-gradient-to-br from-pink-500/[0.06] to-transparent",
  },
  baby: {
    label: "Baby",
    blurb: "Care, play, nursery, and comfort for little ones.",
    icon: <IconOnesie />,
    iconBox:
      "bg-fuchsia-500/15 text-fuchsia-800 ring-fuchsia-500/20 dark:bg-fuchsia-500/10 dark:text-fuchsia-300 dark:ring-fuchsia-500/20",
    cardAccent:
      "hover:border-fuchsia-300/60 dark:hover:border-fuchsia-700/50 bg-gradient-to-br from-fuchsia-500/[0.06] to-transparent",
  },
  kitchen: {
    label: "Kitchen",
    blurb: "Cookware, storage, prep tools, and dining helpers.",
    icon: <IconSpark />,
    iconBox:
      "bg-amber-500/15 text-amber-800 ring-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20",
    cardAccent:
      "hover:border-amber-300/60 dark:hover:border-amber-700/50 bg-gradient-to-br from-amber-500/[0.06] to-transparent",
  },
  laptops: {
    label: "Laptops",
    blurb: "Portable power for work, school, and creative projects.",
    icon: <IconMonitor />,
    iconBox:
      "bg-emerald-500/15 text-emerald-700 ring-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20",
    cardAccent:
      "hover:border-emerald-300/60 dark:hover:border-emerald-700/50 bg-gradient-to-br from-emerald-500/[0.06] to-transparent",
  },
  bedroom: {
    label: "Bedroom",
    blurb: "Sleep, storage, bedding, and calm spaces.",
    icon: <IconMoonSleep />,
    iconBox:
      "bg-indigo-500/15 text-indigo-800 ring-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-500/20",
    cardAccent:
      "hover:border-indigo-300/60 dark:hover:border-indigo-700/50 bg-gradient-to-br from-indigo-500/[0.06] to-transparent",
  },
  car: {
    label: "Car & auto",
    blurb: "Care, safety, and organization for the road.",
    icon: <IconCar />,
    iconBox:
      "bg-zinc-500/15 text-zinc-800 ring-zinc-500/20 dark:bg-zinc-500/10 dark:text-zinc-300 dark:ring-zinc-500/20",
    cardAccent:
      "hover:border-zinc-300/60 dark:hover:border-zinc-600/50 bg-gradient-to-br from-zinc-500/[0.06] to-transparent",
  },
} satisfies Record<
  (typeof CATEGORY_ORDER)[number],
  {
    label: string;
    blurb: string;
    icon: ReactNode;
    iconBox: string;
    cardAccent: string;
  }
>;

export function CategoryHighlightsSection() {
  const catalog = getMergedProducts();

  return (
    <section className="section-y border-b border-zinc-200/80 dark:border-zinc-800/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
          Shop by category
        </h2>
        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-zinc-600 dark:text-zinc-400">
          Explore moms, baby, kitchen, laptops, bedroom, and car — browse the
          demo catalog with search and filters on the shop page.
        </p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORY_ORDER.map((id) => {
            const meta = META[id];
            const count = countByCategory(catalog, id);
            return (
              <li key={id}>
                <Link
                  href={`/shop?category=${encodeURIComponent(id)}`}
                  className={cn(
                    "group flex h-full flex-col rounded-2xl border border-zinc-200/90 p-6 shadow-sm transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-zinc-800",
                    meta.cardAccent,
                  )}
                >
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl ring-1",
                      meta.iconBox,
                    )}
                  >
                    {meta.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    {meta.label}
                  </h3>
                  <p className="mt-1 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {meta.blurb}
                  </p>
                  <p className="mt-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {count} {count === 1 ? "product" : "products"}{" "}
                    <span
                      className="text-zinc-400 transition group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
                      aria-hidden
                    >
                      →
                    </span>
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
