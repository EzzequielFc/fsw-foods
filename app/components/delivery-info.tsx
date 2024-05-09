import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { formatCurrency } from "../helpers/price";
import { Restaurant } from "@prisma/client";

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">;
}

export function DeliveryInfo({ restaurant }: DeliveryInfoProps) {
  return (
    <div className="px-5">
      <Card className="flex justify-around py-3 mt-6">
        <div className="flex flex-col items-center">
          <div className="flex gap-1 items-center text-muted-foreground">
            <BikeIcon size={14} />
            <span className="text-xs">Entrega</span>
          </div>

          {Number(restaurant.deliveryFee) > 0 ? (
            <p className="text-xs font-semibold">
              {formatCurrency(Number(restaurant.deliveryFee))}
            </p>
          ) : (
            <p className="text-xs font-semibold">Grátis</p>
          )}
        </div>

        <div className="flex flex-col items-center">
          <div className="flex gap-1 items-center text-muted-foreground">
            <TimerIcon size={14} />
            <span className="text-xs">Entrega</span>
          </div>

          {Number(restaurant.deliveryFee) > 0 ? (
            <p className="text-xs font-semibold">
              {restaurant.deliveryTimeMinutes} min
            </p>
          ) : (
            <p className="text-xs font-semibold">Grátis</p>
          )}
        </div>
      </Card>
    </div>
  );
}
