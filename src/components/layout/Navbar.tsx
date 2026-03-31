"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { publicAsset } from "@/lib/public-asset";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/use-cart";

const BRAND = "ABails Shop";

const nav = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/cart", label: "Cart" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

function cartItemCount(items: { quantity: number }[]): number {
  return items.reduce((n, line) => n + line.quantity, 0);
}

export function Navbar() {
  const pathname = usePathname();
  const count = useCartStore((s) => cartItemCount(s.items));

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/75 dark:border-zinc-800/80 dark:bg-zinc-950/90 dark:supports-[backdrop-filter]:bg-zinc-950/75">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:gap-6 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-zinc-900 transition-colors duration-200 hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300"
        >
          <Image
            src={publicAsset("/abails-logo.png")}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-lg object-cover shadow-sm ring-1 ring-zinc-200/80 dark:ring-zinc-700/80"
            priority
          />
          <span>{BRAND}</span>
        </Link>

        <nav
          className="flex flex-wrap items-center justify-end gap-x-1 gap-y-2 sm:gap-x-2"
          aria-label="Primary"
        >
          <ul className="flex flex-wrap items-center gap-x-1 sm:gap-x-2">
            {nav.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : item.href === "/shop"
                    ? pathname === "/shop" || pathname.startsWith("/product/")
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);
              const isCart = item.href === "/cart";

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-[color,background-color,box-shadow] duration-200",
                      isActive
                        ? "bg-zinc-100 text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{item.label}</span>
                    {isCart && count > 0 ? (
                      <Badge
                        variant="primary"
                        size="sm"
                        className="ml-2 min-w-[1.25rem] justify-center px-1.5 tabular-nums"
                        aria-label={`${count} items in cart`}
                      >
                        {count > 99 ? "99+" : count}
                      </Badge>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
