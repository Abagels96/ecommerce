import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const p = path.join(__dirname, "..", "src", "data", "products.ts");
let lines = fs.readFileSync(p, "utf8").split("\n");
let id = null;
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^\s*id: "(prod-\d+)"/);
  if (m) id = m[1];
  if (id && /^\s*image: "/.test(lines[i])) {
    lines[i] = `    image: "/products/${id}.jpg",`;
    id = null;
  }
}
fs.writeFileSync(p, lines.join("\n"));
console.log("Updated", p);
