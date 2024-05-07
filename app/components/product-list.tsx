import { Prisma } from "@prisma/client";
import { db } from "../lib/prisma";
import ProductItem from "./product-item";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

export default async function ProductList({ products }: ProductListProps) {
  return (
    <div className="flex overflow-x-scroll px-5  [&::-webkit-scrollbar]:hidden gap-4">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}
