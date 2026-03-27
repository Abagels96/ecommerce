import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";
import { buttonClassName } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <PageContainer className="py-16 sm:py-24">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Product
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          We couldn’t find that product
        </h1>
        <p className="mt-4 text-pretty leading-relaxed text-zinc-600 dark:text-zinc-400">
          The ID in the URL doesn’t match anything in the mock catalog. Try
          browsing the shop or head home.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/shop"
            className={buttonClassName({ variant: "primary", size: "md" })}
          >
            Browse shop
          </Link>
          <Link
            href="/"
            className={buttonClassName({ variant: "outline", size: "md" })}
          >
            Back to home
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
