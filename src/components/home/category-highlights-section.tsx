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
  "maternity-wear",
  "diapering",
  "nursery-sleep",
  "feeding",
  "baby-gear",
  "baby-fashion",
  "home-living",
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

function IconDiaper() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 8c0-3 2.5-5 6-5s6 2 6 5v8c0 2-2 4-6 4s-6-2-6-4V8z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 10h8M9 14h6"
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

function IconBottle() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 2h6v3l2 2v13a2 2 0 01-2 2H9a2 2 0 01-2-2V7l2-2V2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 9h6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconStroller() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="8" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4 18h1.5M6 10l3-6h8l2 4M10 10h8l-1 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
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

function IconHomeLiving() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
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
  "maternity-wear": {
    label: "Maternity & nursing",
    blurb: "Tops, dresses, leggings, and postpartum comfort.",
    icon: <IconShirt />,
    iconBox:
      "bg-pink-500/15 text-pink-800 ring-pink-500/20 dark:bg-pink-500/10 dark:text-pink-300 dark:ring-pink-500/20",
    cardAccent:
      "hover:border-pink-300/60 dark:hover:border-pink-700/50 bg-gradient-to-br from-pink-500/[0.06] to-transparent",
  },
  diapering: {
    label: "Diapering",
    blurb: "Diapers, wipes, creams, bags, and changing pads.",
    icon: <IconDiaper />,
    iconBox:
      "bg-lime-500/15 text-lime-900 ring-lime-500/25 dark:bg-lime-500/10 dark:text-lime-300 dark:ring-lime-500/20",
    cardAccent:
      "hover:border-lime-400/60 dark:hover:border-lime-700/50 bg-gradient-to-br from-lime-500/[0.08] to-transparent",
  },
  "nursery-sleep": {
    label: "Nursery & sleep",
    blurb: "Cribs, monitors, sound machines, bedding, and swaddles.",
    icon: <IconMoonSleep />,
    iconBox:
      "bg-indigo-500/15 text-indigo-800 ring-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-500/20",
    cardAccent:
      "hover:border-indigo-300/60 dark:hover:border-indigo-700/50 bg-gradient-to-br from-indigo-500/[0.06] to-transparent",
  },
  feeding: {
    label: "Feeding",
    blurb: "Bottles, pumps, bibs, warmers, and nursing covers.",
    icon: <IconBottle />,
    iconBox:
      "bg-cyan-500/15 text-cyan-800 ring-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-300 dark:ring-cyan-500/20",
    cardAccent:
      "hover:border-cyan-300/60 dark:hover:border-cyan-700/50 bg-gradient-to-br from-cyan-500/[0.06] to-transparent",
  },
  "baby-gear": {
    label: "Baby gear",
    blurb: "Strollers, carriers, car seats, travel cribs, and play mats.",
    icon: <IconStroller />,
    iconBox:
      "bg-fuchsia-500/15 text-fuchsia-800 ring-fuchsia-500/20 dark:bg-fuchsia-500/10 dark:text-fuchsia-300 dark:ring-fuchsia-500/20",
    cardAccent:
      "hover:border-fuchsia-300/60 dark:hover:border-fuchsia-700/50 bg-gradient-to-br from-fuchsia-500/[0.06] to-transparent",
  },
  "baby-fashion": {
    label: "Baby fashion",
    blurb: "Rompers, sleepers, knits, hats, and seasonal layers.",
    icon: <IconOnesie />,
    iconBox:
      "bg-orange-500/15 text-orange-800 ring-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300 dark:ring-orange-500/20",
    cardAccent:
      "hover:border-orange-300/60 dark:hover:border-orange-700/50 bg-gradient-to-br from-orange-500/[0.06] to-transparent",
  },
  "home-living": {
    label: "Home & living",
    blurb: "Hydration, organization, bath, laundry, and everyday essentials.",
    icon: <IconHomeLiving />,
    iconBox:
      "bg-teal-500/15 text-teal-800 ring-teal-500/20 dark:bg-teal-500/10 dark:text-teal-300 dark:ring-teal-500/20",
    cardAccent:
      "hover:border-teal-300/60 dark:hover:border-teal-700/50 bg-gradient-to-br from-teal-500/[0.06] to-transparent",
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
          Explore tech & desk, then maternity, diapering, nursery, feeding, gear,
          baby clothes, and home essentials — all in one place (mock catalog).
        </p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6">
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
