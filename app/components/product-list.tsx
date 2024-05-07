import { db } from "../lib/prisma";
import ProductItem from "./product-item";

export default async function ProductList() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true
        }
      }
    }
  });

  return (
    <div className="flex overflow-x-scroll px-5  [&::-webkit-scrollbar]:hidden gap-4">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}
