export type CurrencyFormatOptions = {
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

const defaultOptions = {
  locale: "en-US",
  currency: "USD",
} as const;

/**
 * Formats a monetary amount (e.g. USD dollars: `129.99`).
 */
export function formatCurrency(
  amount: number,
  options?: CurrencyFormatOptions,
): string {
  const locale = options?.locale ?? defaultOptions.locale;
  const currency = options?.currency ?? defaultOptions.currency;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    ...(options?.minimumFractionDigits !== undefined && {
      minimumFractionDigits: options.minimumFractionDigits,
    }),
    ...(options?.maximumFractionDigits !== undefined && {
      maximumFractionDigits: options.maximumFractionDigits,
    }),
  }).format(amount);
}
