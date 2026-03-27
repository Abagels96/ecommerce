import { cn } from "@/lib/utils";

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M6 6h15l-1.5 9h-12zM6 6L5 3H2M9 20a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DataIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 6h16M4 12h16M4 18h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

const BENEFITS = [
  {
    title: "Instant browsing",
    body: "No accounts or sign-up flows — jump straight into a responsive catalog built for the App Router.",
    Icon: BoltIcon,
  },
  {
    title: "Cart that persists",
    body: "Zustand + localStorage keeps your basket between visits, all client-side.",
    Icon: CartIcon,
  },
  {
    title: "Transparent mock data",
    body: "Prices, stock, and ratings ship as typed seed data — easy to swap for a real API later.",
    Icon: DataIcon,
  },
  {
    title: "Dashboard-ready",
    body: "A simple admin shell demonstrates how you’d manage products in a full product.",
    Icon: GridIcon,
  },
] as const;

export function WhyShopSection() {
  return (
    <section className="section-y">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
          Why shop with us
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-center leading-relaxed text-zinc-600 dark:text-zinc-400">
          Built as a portfolio storefront: mock commerce data, real UX polish,
          and room to grow into production APIs.
        </p>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-8">
          {BENEFITS.map(({ title, body, Icon }) => (
            <li
              key={title}
              className="relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-50/90 p-6 shadow-sm transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-zinc-800 dark:bg-zinc-900/45 dark:hover:border-zinc-700"
            >
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-zinc-700 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-700">
                  <Icon />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
