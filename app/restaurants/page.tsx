"use client";

import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchRestaurants } from "./actions/search";
import Header from "../components/header";
import RestaurantItem from "../components/restaurant-item";

export default function Restaurants() {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchResturants = async () => {
      if (!searchFor) return;

      const foundRestaurants = await searchRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchResturants();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="font-semibold text-lg ">Pedidos Recomendados</h2>
        <div className="grid grid-cols-2 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
}
