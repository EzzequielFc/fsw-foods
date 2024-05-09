import { db } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import { DeliveryInfo } from "@/app/components/delivery-info";
import ProductList from "@/app/components/product-list";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

export default async function RestaurantPage({
  params: { id },
}: RestaurantPageProps) {
  const restaurant = await db.restaurant.findUnique({
    where: { id },
    include: {
      categories: {
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
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

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />

      <div className="flex justify-between items-center px-5 pt-5 relative z-50 mt-[-1.5rem] bg-white rounded-lg">
        {/** TITULO */}
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>

        <div className="bg-foreground gap-2 px-2 py-[2px] rounded-full flex items-center text-white bg-white">
          <StarIcon size={12} className="fill-yellow-500 text-yellow-400" />
          <span className="font-semibold text-xs text-white ">5,0</span>
        </div>
      </div>

      <DeliveryInfo restaurant={restaurant} />

      <div className="flex overflow-x-scroll gap-4 [&::-webkit-scrollbar]:hidden mt-3 px-5">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="bg-[#F4F4F4] min-w-[167px] rounded-lg text-center"
          >
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <div className="px-5 mt-6">
        <h2 className="font-semibold mb-3">Mais Pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => (
        <div key={category.id} className="px-5 mt-6">
          <h2 className="font-semibold mb-3">{category.name}</h2>
          <ProductList products={category.products} />
        </div>
      ))}
    </div>
  );
}
