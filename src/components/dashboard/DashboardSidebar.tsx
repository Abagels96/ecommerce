"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview", match: "exact" as const },
  { href: "/dashboard/products", label: "Products", match: "products" as const },
  {
    href: "/dashboard/products/new",
    label: "New product",
    match: "exact" as const,
  },
] as const;

function isActive(
  pathname: string,
  href: string,
  match: "exact" | "products",
): boolean {
  if (match === "exact") return pathname === href;
  if (match === "products") {
    if (pathname === "/dashboard/products") return true;
    if (
      pathname.startsWith("/dashboard/products/") &&
      pathname !== "/dashboard/products/new"
    ) {
      return true;
    }
    return false;
  }
  return false;
}

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 overflow-x-auto border-b border-zinc-200/90 bg-zinc-50/95 [-webkit-overflow-scrolling:touch] dark:border-zinc-800 dark:bg-zinc-900/40 lg:w-56 lg:overflow-visible lg:border-b-0 lg:border-r lg:bg-transparent">
      <nav
        className="flex min-w-min flex-nowrap gap-1 p-3 sm:p-4 lg:flex-col lg:flex-wrap lg:gap-0.5 lg:pr-2"
        aria-label="Dashboard"
      >
        {links.map((item) => {
          const active = isActive(pathname, item.href, item.match);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "shrink-0 rounded-lg px-3 py-2.5 text-sm font-medium transition-[color,background-color,box-shadow] duration-200",
                active
                  ? "bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200/80 dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-700/80"
                  : "text-zinc-600 hover:bg-white/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-50",
              )}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
