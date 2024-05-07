import { db } from "../lib/prisma";
import RestaurantItem from "./restaurant-item";

export default async function RestaurantList() {
  const restaurants = await db.restaurant.findMany({ take: 10 });

  return (
    <div className="flex overflow-x-scroll px-5  [&::-webkit-scrollbar]:hidden gap-4">
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
