"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { cn, getLocalStorage, setLocalStorage, showNotification } from "@/utils";
import { Button, Notification } from "@/components";
import { localStorageKeys, routes } from "@/constants";

type ProductListPageCartProps = {
  id: string;
  name: string;
  price: number;
  url: string;
};

export default function ProductListPageCart({ id, name, price, url }: ProductListPageCartProps) {
  const router = useRouter();

  const handleViewDetails = (id: string) => {
    router.push(routes.PRODUCT_DETAIL.replace(":id", id));
  };

  const handleAddToCart = () => {
    try {
      const cart = getLocalStorage(localStorageKeys.CART) as CartItem[];
      const isItemInCart = cart.find((item) => item.id === id);

      if (isItemInCart) {
        isItemInCart.quantity += 1;
      } else {
        cart.push({ id, name, price, quantity: 1, url });
      }

      setLocalStorage(localStorageKeys.CART, cart);
      showNotification(<Notification type="success" message="Added to cart" />);
    } catch (e) {
      console.error(e);
      showNotification(<Notification type="failed" message="Failed to add to cart" />);
    }
  };

  return (
    <div className="lg:w-fit w-full rounded-lg border border-gray-200">
      <button
        type="button"
        className="w-full flex flex-col gap-3 text-left p-4 hover:opacity-60 transition-all duration-300"
        onClick={() => handleViewDetails(id)}
      >
        <div className={cn("relative xl:w-[25vw] lg:w-[40vw] aspect-[700/500]", "rounded-lg overflow-hidden")}>
          <Image src={url} alt="Image" fill sizes="(min-width: 0) 50vw" className="object-cover" />
        </div>

        <p className="text-lg leading-none font-bold">{name}</p>
        <p className="text-sm leading-none text-gray-500">${price} USD</p>
      </button>

      <div className="p-4 pt-5">
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </div>
    </div>
  );
}
