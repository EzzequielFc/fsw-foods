import Header from "@/app/components/header";
import RestaurantItem from "@/app/components/restaurant-item";
import { db } from "@/app/lib/prisma";

export default async function RecommendedRestaurant() {
  const restaurants = await db.restaurant.findMany({});

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="font-semibold text-lg ">Restaurantes Recomendados</h2>
        <div className="flex flex-col w-full gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
}
