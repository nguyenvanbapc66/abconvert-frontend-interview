import { Cart, ProductListPageCart } from "@/components";
import { products } from "@/constants";

export default function ProductListPageStyled() {
  return (
    <div className="relative p-10 pt-16 flex flex-col md:flex-row flex-wrap justify-center gap-6">
      <Cart />

      {products.map((product) => (
        <ProductListPageCart key={product.id} {...product} />
      ))}
    </div>
  );
}
