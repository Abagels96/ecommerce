export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  /** USD, e.g. 129.99 */
  price: number;
  image: string;
  category: string;
  featured: boolean;
  stock: number;
  /** Typical 0–5 scale */
  rating: number;
  /** ISO 8601 date string */
  createdAt: string;
};

export type CartLine = {
  productId: string;
  quantity: number;
};

export type MockOrderLine = {
  productId: string;
  quantity: number;
  /** Snapshot USD unit price at checkout */
  unitPrice: number;
};

export type MockOrder = {
  id: string;
  createdAt: string;
  lines: MockOrderLine[];
  total: number;
  status: "pending" | "completed" | "cancelled";
  fullName: string;
  email: string;
  address: string;
  city: string;
  phone: string;
};
