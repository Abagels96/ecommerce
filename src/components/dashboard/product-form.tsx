"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { buttonClassName } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { products as seedProducts } from "@/data/products";
import { getMergedProducts } from "@/lib/catalog";
import type { ProductFormInput, ProductFormOutput } from "@/lib/product-form-schema";
import { productFormSchema } from "@/lib/product-form-schema";
import { createProductId } from "@/lib/product-id";
import { getProductCategories } from "@/lib/shop-products";
import { setStoredProducts } from "@/lib/storage";
import type { Product } from "@/types";

const categorySuggestions = getProductCategories(seedProducts);

const emptyDefaults = (): ProductFormInput => ({
  name: "",
  slug: "",
  description: "",
  price: 9.99,
  image: "/products/prod-01.jpg",
  category: "",
  featured: false,
  stock: 10,
  rating: 4.5,
});

function productToFormValues(p: Product): ProductFormInput {
  return {
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: p.price,
    image: p.image,
    category: p.category,
    featured: p.featured,
    stock: p.stock,
    rating: p.rating,
  };
}

function defaultValuesForProps(props: ProductFormProps): ProductFormInput {
  if (props.mode === "create") return emptyDefaults();
  return productToFormValues(props.product);
}

export type ProductFormProps =
  | { mode: "create" }
  | { mode: "edit"; product: Product };

export function ProductForm(props: ProductFormProps) {
  const router = useRouter();
  const mode = props.mode;
  const product = props.mode === "edit" ? props.product : undefined;

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormInput, unknown, ProductFormOutput>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultValuesForProps(props),
  });

  useEffect(() => {
    if (mode === "edit" && product) {
      reset(productToFormValues(product));
    }
  }, [mode, product, reset]);

  const onSubmit = (data: ProductFormOutput) => {
    const merged = getMergedProducts();

    if (mode === "create") {
      if (merged.some((p) => p.slug === data.slug)) {
        setError("slug", {
          message: "That slug is already used. Pick another.",
        });
        return;
      }

      const nextProduct: Product = {
        id: createProductId(),
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        image: data.image,
        category: data.category,
        featured: data.featured,
        stock: data.stock,
        rating: data.rating,
        createdAt: new Date().toISOString(),
      };

      const ok = setStoredProducts([...merged, nextProduct]);
      if (!ok) {
        setError("root", { message: "Could not save to localStorage." });
        return;
      }
    } else {
      if (!product) return;

      const slugTaken = merged.some(
        (p) => p.slug === data.slug && p.id !== product.id,
      );
      if (slugTaken) {
        setError("slug", {
          message: "That slug is already used by another product.",
        });
        return;
      }

      const updated: Product = {
        ...product,
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        image: data.image,
        category: data.category,
        featured: data.featured,
        stock: data.stock,
        rating: data.rating,
        id: product.id,
        createdAt: product.createdAt,
      };

      const next = merged.map((p) => (p.id === product.id ? updated : p));
      const ok = setStoredProducts(next);
      if (!ok) {
        setError("root", { message: "Could not save to localStorage." });
        return;
      }
    }

    router.push("/dashboard/products");
  };

  const title = mode === "create" ? "New product" : "Edit product";
  const description =
    mode === "create" ? (
      <>
        Adds to the merged catalog and persists to{" "}
        <code className="rounded bg-zinc-100 px-1 py-0.5 text-sm dark:bg-zinc-900">
          ecommerce-mvp:products
        </code>
        .
      </>
    ) : (
      <>
        Updates are saved to the merged catalog in{" "}
        <code className="rounded bg-zinc-100 px-1 py-0.5 text-sm dark:bg-zinc-900">
          ecommerce-mvp:products
        </code>
        .
      </>
    );

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          <Link
            href="/dashboard/products"
            className="font-medium text-zinc-700 hover:underline dark:text-zinc-300"
          >
            ← Products
          </Link>
        </p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h1>
        {mode === "edit" && product ? (
          <p className="mt-1 font-mono text-xs text-zinc-500 dark:text-zinc-400">
            ID: {product.id}
          </p>
        ) : null}
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>

      <form
        className="surface-card p-6 sm:p-8"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {errors.root ? (
          <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
            {errors.root.message}
          </p>
        ) : null}

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              label="Name"
              placeholder="Minimal Desk Lamp"
              error={errors.name?.message}
              {...register("name")}
            />
          </div>
          <Input
            label="Slug"
            placeholder="minimal-desk-lamp"
            hint="URL-friendly; lowercase and hyphens."
            error={errors.slug?.message}
            {...register("slug")}
          />
          <div>
            <Input
              label="Category"
              list="category-suggestions"
              placeholder="e.g. headphones"
              hint="Pick a suggestion or type a new category."
              error={errors.category?.message}
              {...register("category")}
            />
            <datalist id="category-suggestions">
              {categorySuggestions.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>

          <Input
            label="Price (USD)"
            type="number"
            step="0.01"
            min="0"
            inputMode="decimal"
            error={errors.price?.message}
            {...register("price")}
          />
          <Input
            label="Image path or URL"
            placeholder="/products/prod-01.jpg"
            error={errors.image?.message}
            {...register("image")}
          />
          <Input
            label="Stock"
            type="number"
            min="0"
            step="1"
            inputMode="numeric"
            error={errors.stock?.message}
            {...register("stock")}
          />
          <Input
            label="Rating (0–5)"
            type="number"
            step="0.1"
            min="0"
            max="5"
            inputMode="decimal"
            error={errors.rating?.message}
            {...register("rating")}
          />

          <div className="flex items-end sm:col-span-2">
            <Controller
              name="featured"
              control={control}
              render={({ field }) => (
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/40">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-400 dark:border-zinc-600 dark:bg-zinc-950"
                    checked={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    Featured product
                  </span>
                </label>
              )}
            />
          </div>

          <div className="sm:col-span-2">
            <Textarea
              label="Description"
              placeholder="Short catalog description…"
              rows={4}
              error={errors.description?.message}
              {...register("description")}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 border-t border-zinc-100 pt-8 dark:border-zinc-800">
          <button
            type="submit"
            disabled={isSubmitting}
            className={buttonClassName({
              variant: "primary",
              size: "md",
              className: "min-w-[140px]",
            })}
          >
            {isSubmitting
              ? "Saving…"
              : mode === "create"
                ? "Save product"
                : "Save changes"}
          </button>
          <Link
            href="/dashboard/products"
            className={buttonClassName({ variant: "outline", size: "md" })}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
