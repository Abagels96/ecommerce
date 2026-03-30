/**
 * Rewrites legacy DummyJSON image URLs in src/data/products.ts to current
 * CDN paths (thumbnail.webp). Run: node scripts/fix-dummyjson-product-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PRODUCTS_FILE = path.join(__dirname, "..", "src", "data", "products.ts");

const res = await fetch(
  "https://dummyjson.com/products?limit=100&select=id,thumbnail",
);
const data = await res.json();
/** @type {Record<string, string>} */
const idToThumb = {};
for (const p of data.products) {
  idToThumb[String(p.id)] = p.thumbnail;
}

let s = fs.readFileSync(PRODUCTS_FILE, "utf8");
const re =
  /https:\/\/cdn\.dummyjson\.com\/product-images\/(\d+)\/thumbnail\.(?:jpg|jpeg|png|webp)/g;

let n = 0;
s = s.replace(re, (full, id) => {
  const next = idToThumb[id];
  if (!next) {
    console.warn("No thumbnail for product id", id);
    return full;
  }
  n++;
  return next;
});

fs.writeFileSync(PRODUCTS_FILE, s);
console.log("Updated", n, "image URLs in", PRODUCTS_FILE);
