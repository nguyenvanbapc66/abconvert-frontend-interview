"use client";
import { useEffect, useState } from "react";

import { Cart, ProductListPageCart } from "@/components";
import { getProductsForCurrentUser } from "@/utils/productUtils";

export default function ProductListPageStyled() {
  const [products, setProducts] = useState<Omit<CartItem, "quantity">[]>([]);

  useEffect(() => {
    setProducts(getProductsForCurrentUser());
  }, []);

  return (
    <div className="relative p-10 pt-16 flex flex-col md:flex-row flex-wrap justify-center gap-6">
      <Cart />

      {products.map((product) => (
        <ProductListPageCart key={product.id} {...product} />
      ))}
    </div>
  );
}
