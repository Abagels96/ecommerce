import { Badge } from "@/components/ui/badge";

export function ProductStockBadge({ stock }: { stock: number }) {
  if (stock <= 0) {
    return (
      <Badge variant="destructive" size="sm">
        Out of stock
      </Badge>
    );
  }
  if (stock <= 10) {
    return (
      <Badge variant="warning" size="sm">
        Only {stock} left
      </Badge>
    );
  }
  return (
    <Badge variant="success" size="sm">
      In stock
    </Badge>
  );
}
