"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { cn, getLocalStorage, setLocalStorage } from "@/utils";
import { IconArrowLeft, IconDelete } from "@/assets/icons";
import { localStorageKeys, routes } from "@/constants";
import { Button, CartPageQuantity } from "@/components";

export default function CartPageStyled() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const router = useRouter();

  const priceTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    const cart = getLocalStorage(localStorageKeys.CART) as CartItem[];
    setCart(cart);
  }, []);

  const handleBackClick = () => {
    router.back();
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    const updatedCart = cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + quantity } : item));
    setLocalStorage(localStorageKeys.CART, updatedCart);
    setCart(updatedCart);
  };

  const handleDeleteClick = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setLocalStorage(localStorageKeys.CART, updatedCart);
    setCart(updatedCart);
  };

  const handleCheckoutClick = () => {
    router.push(routes.CHECKOUT);
  };

  return (
    <div className="p-10">
      <button className="mb-4" onClick={handleBackClick}>
        <IconArrowLeft fill="black" className="w-8 h-8" />
      </button>

      <p className="border-b border-gray-200 pb-4">
        <span className="text-2xl font-bold">The cart</span>&nbsp;&nbsp;
        <span className="text-sm text-gray-500">{cart.length} items</span>
      </p>

      {cart.length > 0 && (
        <>
          <div className="flex flex-col gap-4 border-b border-gray-200 pb-4 mt-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "max-w-2xl flex justify-between items-start",
                  "border border-gray-200 rounded-xl p-3 shadow-md"
                )}
              >
                <div className="flex gap-4">
                  <div className="relative w-[130px] aspect-square rounded-lg overflow-hidden">
                    <Image src={item.url} alt={item.name} fill sizes="(min-width: 0) 50vw" className="object-cover" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-lg font-medium">{item.name}</p>

                    <div className="flex items-center">
                      <CartPageQuantity
                        quantity={item.quantity}
                        onMinusClick={() => handleQuantityChange(item.id, -1)}
                        onPlusClick={() => handleQuantityChange(item.id, 1)}
                      />

                      <div className="w-[1px] h-[24px] mx-4 bg-gray-300" />

                      <button onClick={() => handleDeleteClick(item.id)}>
                        <IconDelete className="w-4 h-4" fill="red" />
                      </button>
                    </div>
                  </div>
                </div>

                <p className="font-medium">${item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl flex justify-end items-center mt-4">
            <p className="text-xl font-medium">Total:</p>&nbsp;
            <p className="text-xl font-medium">${priceTotal}</p>
          </div>

          <div className="max-w-2xl mt-4 flex justify-end">
            <Button className="w-fit bg-black text-white px-4 py-2 rounded-lg" onClick={handleCheckoutClick}>
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
