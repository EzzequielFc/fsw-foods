import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

export default function RestaurantItem({ restaurant }: RestaurantItemProps) {
  return (
    <Link
      className="min-w-[266px] max-w-[266px]"
      href={`/restaurants/${restaurant.id}`}
    >
      <div className="w-full space-y-3 mb-6">
        <div className="w-full h-[136px] relative">
          <Image
            src={restaurant.imageUrl}
            fill
            className="object-cover rounded-lg shadow-md"
            alt={restaurant.name}
          />

          <div className="absolute gap-1 top-2 left-2 bg-primary px-2 py-[2px] rounded-full flex items-center text-white bg-white">
            <StarIcon size={12} className="fill-yellow-500 text-yellow-400" />
            <span className="font-semibold text-xs text-black">5,0</span>
          </div>

          <Button
            size={"icon"}
            className="absolute top-2 right-2 bg-gray-600 rounded-full w-7 h-7"
          >
            <HeartIcon size={16} className="fill-white" />
          </Button>
        </div>

        <h3 className="font-semibold text-sm">{restaurant.name}</h3>
        <div className="flex gap-3">
          <div className="flex gap-1 items-center">
            <BikeIcon size={12} className="text-primary" />
            <span className="text-xs text-muted-foreground">
              {Number(restaurant.deliveryFee) === 0
                ? "Entrega grátis"
                : `${formatCurrency(Number(restaurant.deliveryFee))}`}
            </span>
          </div>

          <div className="flex gap-1 items-center">
            <TimerIcon size={12} className="text-primary" />
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
