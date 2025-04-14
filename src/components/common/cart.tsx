"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { IconCart } from "@/assets/icons";
import { Button } from "@/components";
import { routes, localStorageKeys } from "@/constants";
import { getLocalStorage } from "@/utils";

export default function Cart() {
  // const cart = getLocalStorage(localStorageKeys.CART) as CartItem[];
  const [numberOfItems, setNumberOfItems] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedCart = getLocalStorage(localStorageKeys.CART) as CartItem[];
      setNumberOfItems(updatedCart?.length || 0);
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleClick = () => {
    router.push(routes.CART);
  };

  return (
    <div className="fixed top-8 right-8 z-10">
      <Button className="p-4 rounded-full bg-[rgba(0,0,0,0.2)] backdrop-blur-md" onClick={handleClick}>
        <IconCart className="w-8 h-8" fill="#664DB3" />
      </Button>

      <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
        <span className="text-white text-xs">{numberOfItems}</span>
      </div>
    </div>
  );
}
