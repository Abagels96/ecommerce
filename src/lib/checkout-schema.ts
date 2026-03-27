import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name")
    .max(120, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address"),
  address: z
    .string()
    .trim()
    .min(5, "Enter a complete street address")
    .max(300, "Address is too long"),
  city: z
    .string()
    .trim()
    .min(2, "Enter your city")
    .max(80, "City name is too long"),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number")
    .max(24, "Phone number is too long")
    .regex(/^[\d\s+().-]+$/, "Use digits and common phone symbols only"),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
