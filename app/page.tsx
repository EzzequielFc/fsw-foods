import Image from "next/image";
import CategoryList from "./components/category-list";
import Header from "./components/header";
import Search from "./components/search";
import ProductList from "./components/product-list";
import { Button } from "./components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./lib/prisma";

export default async function Home() {
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
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header />

      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Image
          src="/promoBanner01.png"
          alt="Até 30% de Desconto em Pizzas"
          height={0}
          width={0}
          className="w-full h-auto object-contain"
          sizes="100vw"
          quality={100}
        />
      </div>

      <div className="pt-6 space-y-2">
        <div className="px-5 flex items-center justify-between">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="text-primary p-0 hover:bg-transparent"
          >
            Ver todos <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductList products={products} />
      </div>
    </>
  );
}
