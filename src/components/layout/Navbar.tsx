"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
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

function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/shop")
    return pathname === "/shop" || pathname.startsWith("/product/");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const count = useCartStore((s) => cartItemCount(s.items));
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const linkClass = (isActive: boolean) =>
    cn(
      "inline-flex w-full items-center justify-center rounded-lg px-3 py-2.5 text-sm font-medium transition-[color,background-color,box-shadow] duration-200 sm:inline-flex sm:w-auto sm:justify-start sm:py-2",
      isActive
        ? "bg-zinc-100 text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
    );

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/75 dark:border-zinc-800/80 dark:bg-zinc-950/90 dark:supports-[backdrop-filter]:bg-zinc-950/75">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 flex-1 items-center gap-2.5 text-base font-semibold tracking-tight text-zinc-900 transition-colors duration-200 hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300 sm:flex-none"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src={publicAsset("/abails-logo.png")}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-lg object-cover shadow-sm ring-1 ring-zinc-200/80 dark:ring-zinc-700/80"
            priority
          />
          <span className="truncate">{BRAND}</span>
        </Link>

        <nav
          className="hidden md:flex md:flex-1 md:items-center md:justify-end"
          aria-label="Primary"
        >
          <ul className="flex flex-wrap items-center justify-end gap-x-1 sm:gap-x-2">
            {nav.map((item) => {
              const isActive = isNavActive(pathname, item.href);
              const isCart = item.href === "/cart";

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={linkClass(isActive)}
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

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200/90 bg-white text-zinc-800 shadow-sm transition-[color,background-color,box-shadow] duration-200 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 md:hidden dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:focus-visible:outline-zinc-500"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-zinc-950/40 backdrop-blur-[1px] md:hidden"
            aria-hidden
            tabIndex={-1}
            onClick={() => setMenuOpen(false)}
          />
          <div
            id="mobile-nav"
            className="fixed inset-x-0 top-14 z-50 border-b border-zinc-200/90 bg-white px-4 pb-6 pt-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] dark:border-zinc-800 dark:bg-zinc-950 md:hidden"
          >
            <nav aria-label="Primary mobile">
              <ul className="flex flex-col gap-1">
                {nav.map((item) => {
                  const isActive = isNavActive(pathname, item.href);
                  const isCart = item.href === "/cart";

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={linkClass(isActive)}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
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
        </>
      ) : null}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
