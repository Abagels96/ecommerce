import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

import { ProductCardActions } from "./product-card-actions";
import { ProductStockBadge } from "./stock-badge";

export type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const outOfStock = product.stock <= 0;
  const href = `/product/${product.id}`;

  return (
    <article className="group/card flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm transition-[border-color,box-shadow] duration-300 ease-out hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600 dark:hover:shadow-xl">
      <Link
        href={href}
        className="relative block aspect-[4/3] bg-zinc-100 outline-none dark:bg-zinc-900"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {product.category}
          </p>
          <ProductStockBadge stock={product.stock} />
        </div>

        <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
          <Link
            href={href}
            className="transition-colors hover:text-zinc-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:hover:text-zinc-300 dark:focus-visible:outline-zinc-500"
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-lg font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
            {formatPrice(product.price)}
          </p>
          <p
            className="text-sm text-zinc-600 dark:text-zinc-400"
            aria-label={`${product.rating.toFixed(1)} out of 5 stars`}
          >
            <span aria-hidden>★ {product.rating.toFixed(1)}</span>
          </p>
        </div>

        <ProductCardActions productId={product.id} outOfStock={outOfStock} />
      </div>
    </article>
  );
}
