import Header from "@/app/components/header";
import ProductItem from "@/app/components/product-item";
import RestaurantItem from "@/app/components/restaurant-item";
import { db } from "@/app/lib/prisma";
import { notFound } from "next/navigation";

interface CategoriesPageProps {
  params: {
    id: string;
  };
}

export default async function CategoriesPage({
  params: { id },
}: CategoriesPageProps) {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!category) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="font-semibold text-lg ">{category.name}</h2>
        <div className="grid grid-cols-2 gap-6">
          {category?.products.map((product) => (
            <ProductItem key={product.id} product={product} className="min-w-full"/>
          ))}
        </div>
      </div>
    </>
  );
}
