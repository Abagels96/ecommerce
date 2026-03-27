import { z } from "zod";

/** Shared Zod schema for admin create + edit product flows. */
export const productFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(200)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Lowercase letters, numbers, and single hyphens between words",
    ),
  description: z.string().trim().min(1, "Description is required").max(2000),
  price: z.coerce
    .number()
    .positive("Price must be greater than 0")
    .max(999_999.99, "Price is too large"),
  image: z
    .string()
    .trim()
    .min(1, "Image path or URL is required")
    .max(500)
    .refine(
      (s) => s.startsWith("/") || /^https?:\/\//i.test(s),
      "Use a path starting with / or an http(s) URL",
    ),
  category: z.string().trim().min(1, "Category is required").max(80),
  featured: z.boolean(),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative").max(999_999),
  rating: z.coerce.number().min(0, "Min 0").max(5, "Max 5"),
});

export type ProductFormInput = z.input<typeof productFormSchema>;
export type ProductFormOutput = z.output<typeof productFormSchema>;
