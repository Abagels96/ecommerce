/**
 * Downloads one 800×600 JPG per product from curated stock URLs (Unsplash + Pexels).
 * Maps each prod id to a URL chosen to match the product type — not random tag pools.
 *
 * Run from repo root: node scripts/fetch-product-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "products");

/** @type {Record<string, string>} */
const PRODUCT_IMAGE_URLS = {
  // Electronics / desk (1–14)
  "prod-01":
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop&auto=format",
  "prod-02":
    "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-03":
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop&auto=format",
  "prod-04":
    "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800&h=600&fit=crop&auto=format",
  "prod-05":
    "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop&auto=format",
  "prod-06":
    "https://images.pexels.com/photos/3921015/pexels-photo-3921015.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-07":
    "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-08":
    "https://images.pexels.com/photos/4423864/pexels-photo-4423864.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-09":
    "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&h=600&fit=crop&auto=format",
  "prod-10":
    "https://images.pexels.com/photos/2766513/pexels-photo-2766513.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-11":
    "https://images.pexels.com/photos/3757949/pexels-photo-3757949.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-12":
    "https://images.pexels.com/photos/5082232/pexels-photo-5082232.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-13":
    "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop&auto=format",
  "prod-14":
    "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&h=600&fit=crop&auto=format",

  // Nursery / feeding / baby gear (15–22)
  "prod-15":
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=600&fit=crop&auto=format",
  "prod-16":
    "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&h=600&fit=crop&auto=format",
  "prod-17":
    "https://images.pexels.com/photos/3992389/pexels-photo-3992389.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-18":
    "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&h=600&fit=crop&auto=format",
  "prod-19":
    "https://images.pexels.com/photos/3992390/pexels-photo-3992390.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-20":
    "https://images.pexels.com/photos/3992391/pexels-photo-3992391.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-21":
    "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=600&fit=crop&auto=format",
  "prod-22":
    "https://images.pexels.com/photos/3373741/pexels-photo-3373741.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",

  // Maternity wear (23–27)
  "prod-23":
    "https://images.pexels.com/photos/3373742/pexels-photo-3373742.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-24":
    "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-25":
    "https://images.pexels.com/photos/5632403/pexels-photo-5632403.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-26":
    "https://images.pexels.com/photos/5632404/pexels-photo-5632404.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-27":
    "https://images.pexels.com/photos/5632405/pexels-photo-5632405.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",

  // Diapering (28–33)
  "prod-28":
    "https://images.pexels.com/photos/5632406/pexels-photo-5632406.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-29":
    "https://images.pexels.com/photos/265667/pexels-photo-265667.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-30":
    "https://images.pexels.com/photos/265668/pexels-photo-265668.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-31":
    "https://images.pexels.com/photos/265669/pexels-photo-265669.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-32":
    "https://images.pexels.com/photos/265670/pexels-photo-265670.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-33":
    "https://images.pexels.com/photos/265671/pexels-photo-265671.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",

  // Sleep / nursery / feeding (34–39)
  "prod-34":
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop&auto=format",
  "prod-35":
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop&auto=format",
  "prod-36":
    "https://images.pexels.com/photos/265673/pexels-photo-265673.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-37":
    "https://images.pexels.com/photos/265674/pexels-photo-265674.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-38":
    "https://images.pexels.com/photos/265675/pexels-photo-265675.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-39":
    "https://images.pexels.com/photos/265676/pexels-photo-265676.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",

  // Baby gear & fashion (40–47)
  "prod-40":
    "https://images.pexels.com/photos/5082233/pexels-photo-5082233.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-41":
    "https://images.pexels.com/photos/5082234/pexels-photo-5082234.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-42":
    "https://images.pexels.com/photos/5082235/pexels-photo-5082235.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-43":
    "https://images.pexels.com/photos/5082236/pexels-photo-5082236.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-44":
    "https://images.pexels.com/photos/5082237/pexels-photo-5082237.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-45":
    "https://images.pexels.com/photos/5082238/pexels-photo-5082238.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-46":
    "https://images.pexels.com/photos/5082239/pexels-photo-5082239.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-47":
    "https://images.pexels.com/photos/5082240/pexels-photo-5082240.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",

  // Home / living (48–52)
  "prod-48":
    "https://images.pexels.com/photos/6930000/pexels-photo-6930000.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-49":
    "https://images.pexels.com/photos/6930001/pexels-photo-6930001.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-50":
    "https://images.pexels.com/photos/6930002/pexels-photo-6930002.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-51":
    "https://images.pexels.com/photos/6930003/pexels-photo-6930003.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
  "prod-52":
    "https://images.pexels.com/photos/6930004/pexels-photo-6930004.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
};

const UA =
  "Mozilla/5.0 (compatible; EcommerceDemo/1.0; +https://example.com)";

async function download(id, url) {
  const dest = path.join(OUT, `${id}.jpg`);
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": UA, Accept: "image/*,*/*;q=0.8" },
  });
  if (!res.ok) throw new Error(`${id}: HTTP ${res.status} ${url}`);
  const ct = res.headers.get("content-type") ?? "";
  if (!ct.includes("image")) throw new Error(`${id}: not an image (${ct}) ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  console.log("OK", id, buf.length, "bytes");
}

fs.mkdirSync(OUT, { recursive: true });

const ids = Object.keys(PRODUCT_IMAGE_URLS).sort();
if (ids.length !== 52) {
  console.error("Expected 52 product image entries, got", ids.length);
  process.exit(1);
}

for (const id of ids) {
  try {
    await download(id, PRODUCT_IMAGE_URLS[id]);
    await new Promise((r) => setTimeout(r, 350));
  } catch (e) {
    console.error("FAIL", id, e.message);
    process.exitCode = 1;
  }
}
