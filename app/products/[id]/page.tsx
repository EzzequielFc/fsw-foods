import { db } from "@/app/lib/prisma";
import { notFound } from "next/navigation";

import ProductImage from "./components/product-image";
import ProductInfo from "./components/product-info";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function Products({ params: { id } }: ProductPageProps) {
  const product = await db.product.findUnique({
    where: { id },
    include: { restaurant: true },
  });

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <ProductImage product={product} />

      <ProductInfo product={product} complementaryProducts={juices} />
    </div>
  );
}
