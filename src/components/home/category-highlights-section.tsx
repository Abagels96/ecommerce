"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { products as seedProducts } from "@/data/products";
import { getMergedProducts } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

const CATEGORY_ORDER = [
  "headphones",
  "keyboards",
  "monitors",
  "chairs",
  "accessories",
] as const;

function countByCategory(source: Product[], category: string): number {
  return source.filter((p) => p.category === category).length;
}

function IconHeadphones() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 14v4a2 2 0 002 2h1M4 14V9a8 8 0 1116 0v5M20 14v4a2 2 0 01-2 2h-1M9 18h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconKeyboard() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="7"
        width="18"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 11h.01M10 11h.01M13 11h.01M16 11h.01M7 14h4"
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

function IconChair() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 10V7a5 5 0 0110 0v3M7 10h10v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4zM9 16v3M15 16v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

const META = {
  headphones: {
    label: "Headphones",
    blurb: "ANC, buds, and wireless sets for focus and play.",
    icon: <IconHeadphones />,
    iconBox:
      "bg-violet-500/15 text-violet-700 ring-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-500/20",
    cardAccent:
      "hover:border-violet-300/60 dark:hover:border-violet-700/50 bg-gradient-to-br from-violet-500/[0.06] to-transparent",
  },
  keyboards: {
    label: "Keyboards",
    blurb: "Mechanical, low-profile, and compact layouts.",
    icon: <IconKeyboard />,
    iconBox:
      "bg-sky-500/15 text-sky-700 ring-sky-500/20 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/20",
    cardAccent:
      "hover:border-sky-300/60 dark:hover:border-sky-700/50 bg-gradient-to-br from-sky-500/[0.06] to-transparent",
  },
  monitors: {
    label: "Monitors",
    blurb: "High-refresh and color-accurate displays.",
    icon: <IconMonitor />,
    iconBox:
      "bg-emerald-500/15 text-emerald-700 ring-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20",
    cardAccent:
      "hover:border-emerald-300/60 dark:hover:border-emerald-700/50 bg-gradient-to-br from-emerald-500/[0.06] to-transparent",
  },
  chairs: {
    label: "Chairs",
    blurb: "Ergonomic and racing-style seating.",
    icon: <IconChair />,
    iconBox:
      "bg-amber-500/15 text-amber-800 ring-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20",
    cardAccent:
      "hover:border-amber-300/60 dark:hover:border-amber-700/50 bg-gradient-to-br from-amber-500/[0.06] to-transparent",
  },
  accessories: {
    label: "Accessories",
    blurb: "Mats, docks, and desk essentials.",
    icon: <IconSpark />,
    iconBox:
      "bg-rose-500/15 text-rose-700 ring-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/20",
    cardAccent:
      "hover:border-rose-300/60 dark:hover:border-rose-700/50 bg-gradient-to-br from-rose-500/[0.06] to-transparent",
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
  const pathname = usePathname();
  const [catalog, setCatalog] = useState<Product[]>(() => [...seedProducts]);

  useEffect(() => {
    setCatalog(getMergedProducts());
  }, [pathname]);

  return (
    <section className="section-y border-b border-zinc-200/80 dark:border-zinc-800/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
          Shop by category
        </h2>
        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-zinc-600 dark:text-zinc-400">
          Explore the catalog by vertical — counts come straight from mock seed
          data.
        </p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
