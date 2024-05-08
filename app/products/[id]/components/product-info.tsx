"use client";

import DiscountBadge from "@/app/components/discount-badge";
import ProductList from "@/app/components/product-list";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/helpers/price";
import { Prisma } from "@prisma/client";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductInfoProps {
  product: Prisma.ProductGetPayload<{ include: { restaurant: true } }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: { restaurant: true };
  }>[];
}

export default function ProductInfo({
  product,
  complementaryProducts,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantityClick = () =>
    setQuantity((currentState) => currentState + 1);
  const handleDecreaseQuantityClick = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1;
      return currentState - 1;
    });

  return (
    <>
      <div className="p-5">
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-6 w-6">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>

        <h1 className="font-semibold text-xl mb-2 mt-1">{product.name}</h1>

        <div className="flex justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-xl">
                Por:{formatCurrency(calculateProductTotalPrice(product))}
              </h2>
              {product.discountPercentage > 0 && (
                <DiscountBadge product={product} />
              )}
            </div>

            {product.discountPercentage > 0 && (
              <p className="text-muted-foreground text-sm">
                De:{formatCurrency(Number(product.price))}
              </p>
            )}
          </div>

          <div className="flex text-center gap-3 items-center">
            <Button
              size="icon"
              variant="ghost"
              className="border border-solid border-muted-foreground"
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon size={22} />
            </Button>
            <span className="w-4">{quantity}</span>
            <Button size="icon" onClick={handleIncreaseQuantityClick}>
              <ChevronRightIcon size={22} />
            </Button>
          </div>
        </div>

        {/** DADOS DA ENTREGA */}
        <Card className="flex justify-around py-3 mt-6">
          {/* CUSTO */}
          <div className="flex flex-col items-center">
            <div className="flex gap-1 items-center text-muted-foreground">
              <BikeIcon size={14} />
              <span className="text-xs">Entrega</span>
            </div>

            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="text-xs font-semibold">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="text-xs font-semibold">Grátis</p>
            )}
          </div>
          {/* TEMPO */}
          <div className="flex flex-col items-center">
            <div className="flex gap-1 items-center text-muted-foreground">
              <TimerIcon size={14} />
              <span className="text-xs">Entrega</span>
            </div>

            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="text-xs font-semibold">
                {product.restaurant.deliveryTimeMinutes} min
              </p>
            ) : (
              <p className="text-xs font-semibold">Grátis</p>
            )}
          </div>
        </Card>

        <div className="mt-6 space-y-3">
          <h3 className="font-bold">Sobre</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        <div className="mt-6 space-y-3">
          <h3 className="font-bold">Sucos</h3>
          <ProductList products={complementaryProducts} />
        </div>
      </div>
    </>
  );
}
