import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export {
  formatCurrency,
  formatCurrency as formatPrice,
  type CurrencyFormatOptions,
} from "./currency";
