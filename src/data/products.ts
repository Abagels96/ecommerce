import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "prod-01",
    name: "Apex ANC Over-Ear Headphones",
    slug: "apex-anc-over-ear-headphones",
    description:
      "Active noise cancellation, 40mm drivers, and 30-hour battery life. Fold-flat design with travel case included.",
    price: 279.99,
    image: "/products/item-1.jpg",
    category: "headphones",
    featured: true,
    stock: 42,
    rating: 4.7,
    createdAt: "2025-01-12T10:00:00.000Z",
  },
  {
    id: "prod-02",
    name: "Pulse Buds Pro",
    slug: "pulse-buds-pro",
    description:
      "True wireless earbuds with adaptive transparency, spatial audio, and IPX4 sweat resistance.",
    price: 199.0,
    image: "/products/item-2.jpg",
    category: "headphones",
    featured: true,
    stock: 88,
    rating: 4.5,
    createdAt: "2025-02-03T14:30:00.000Z",
  },
  {
    id: "prod-03",
    name: "SteelFrame Arctis Wireless",
    slug: "steelframe-arctis-wireless",
    description:
      "Low-latency 2.4 GHz wireless for gaming, retractable mic, and breathable ear cushions.",
    price: 169.99,
    image: "/products/item-3.jpg",
    category: "headphones",
    featured: false,
    stock: 31,
    rating: 4.4,
    createdAt: "2024-11-20T09:15:00.000Z",
  },
  {
    id: "prod-04",
    name: "TypeForge TKL Mechanical Keyboard",
    slug: "typeforge-tkl-mechanical-keyboard",
    description:
      "Hot-swappable switches, per-key RGB, and double-shot PBT keycaps. TKL layout saves desk space.",
    price: 149.0,
    image: "/products/item-4.jpg",
    category: "keyboards",
    featured: true,
    stock: 56,
    rating: 4.6,
    createdAt: "2025-01-28T16:45:00.000Z",
  },
  {
    id: "prod-05",
    name: "QuietType MX Low-Profile",
    slug: "quiettype-mx-low-profile",
    description:
      "Whisper-quiet scissor switches, multi-device Bluetooth, and backlit keys for late-night work.",
    price: 119.99,
    image: "/products/item-5.jpg",
    category: "keyboards",
    featured: false,
    stock: 102,
    rating: 4.3,
    createdAt: "2024-10-08T11:20:00.000Z",
  },
  {
    id: "prod-06",
    name: "Nimbus 60% Gaming Keyboard",
    slug: "nimbus-60-gaming-keyboard",
    description:
      "Compact 60% layout, linear switches, and software macros. USB-C detachable cable.",
    price: 89.99,
    image: "/products/item-6.jpg",
    category: "keyboards",
    featured: false,
    stock: 74,
    rating: 4.2,
    createdAt: "2025-02-14T08:00:00.000Z",
  },
  {
    id: "prod-07",
    name: "Clarity 27\" QHD IPS Monitor",
    slug: "clarity-27-qhd-ips-monitor",
    description:
      "2560×1440, 165 Hz, 1ms MPRT, HDR400. Ideal for work and fast-paced games.",
    price: 349.99,
    image: "/products/item-7.jpg",
    category: "monitors",
    featured: true,
    stock: 19,
    rating: 4.8,
    createdAt: "2025-01-05T12:00:00.000Z",
  },
  {
    id: "prod-08",
    name: "VisionOne 32\" 4K Creator Display",
    slug: "visionone-32-4k-creator-display",
    description:
      "99% sRGB coverage, USB-C 90W power delivery, and height-adjustable stand for color-critical work.",
    price: 599.0,
    image: "/products/item-8.jpg",
    category: "monitors",
    featured: true,
    stock: 12,
    rating: 4.7,
    createdAt: "2024-12-01T15:30:00.000Z",
  },
  {
    id: "prod-09",
    name: "CurveMax 34\" Ultrawide",
    slug: "curvemax-34-ultrawide",
    description:
      "1500R curvature, 3440×1440, 120 Hz. Split-screen multitasking without a dual-monitor gap.",
    price: 749.99,
    image: "/products/item-9.jpg",
    category: "monitors",
    featured: false,
    stock: 8,
    rating: 4.6,
    createdAt: "2025-02-10T10:10:00.000Z",
  },
  {
    id: "prod-10",
    name: "ErgoLift Mesh Task Chair",
    slug: "ergolift-mesh-task-chair",
    description:
      "Adjustable lumbar, 4D armrests, and breathable mesh back. Supports up to 275 lb.",
    price: 429.0,
    image: "/products/item-10.jpg",
    category: "chairs",
    featured: true,
    stock: 24,
    rating: 4.5,
    createdAt: "2024-09-15T13:00:00.000Z",
  },
  {
    id: "prod-11",
    name: "Commander Racing-Style Chair",
    slug: "commander-racing-style-chair",
    description:
      "High-density foam, recline to 165°, memory foam neck pillow. Faux leather finish.",
    price: 329.99,
    image: "/products/item-11.jpg",
    category: "chairs",
    featured: false,
    stock: 37,
    rating: 4.1,
    createdAt: "2024-11-02T09:45:00.000Z",
  },
  {
    id: "prod-12",
    name: "FloatStool Active Perch",
    slug: "floatstool-active-perch",
    description:
      "Encourages movement while standing. Height-adjustable pneumatic column and non-slip base.",
    price: 189.0,
    image: "/products/item-12.jpg",
    category: "chairs",
    featured: false,
    stock: 51,
    rating: 4.0,
    createdAt: "2025-03-01T11:11:00.000Z",
  },
  {
    id: "prod-13",
    name: "DeskMat Pro XL",
    slug: "deskmat-pro-xl",
    description:
      "Stitched edges, spill-resistant coating, 900×400 mm. Smooth glide for mouse and keyboard.",
    price: 45.99,
    image: "/products/item-13.jpg",
    category: "accessories",
    featured: false,
    stock: 200,
    rating: 4.6,
    createdAt: "2025-01-18T07:30:00.000Z",
  },
  {
    id: "prod-14",
    name: "HubLink 10-in-1 USB-C Dock",
    slug: "hublink-10-in-1-usb-c-dock",
    description:
      "HDMI 4K60, SD/microSD, Ethernet, USB-A 3.2, and 100W pass-through charging.",
    price: 79.99,
    image: "/products/item-14.jpg",
    category: "accessories",
    featured: true,
    stock: 143,
    rating: 4.4,
    createdAt: "2024-12-22T16:20:00.000Z",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Other products in the same category (excludes `productId`), sorted by rating. */
export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  return products
    .filter((p) => p.id !== productId && p.category === product.category)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}
