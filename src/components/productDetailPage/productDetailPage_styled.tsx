"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

import { cn } from "@/utils";
import { Button, ProductDetailPageSlider } from "@/components";
import { IconArrowLeft } from "@/assets/icons";
import { products } from "@/constants";
import { applyTestVariation, trackTestInteraction } from "@/utils/abTesting";

export default function ProductDetailPageStyled() {
  const [imageActiveIndex, setImageActiveIndex] = useState<number>(0);

  const router = useRouter();
  const { id } = useParams();

  const product = products.find((product) => product.id === id);
  const currentImage =
    product?.relevantImage?.[
      imageActiveIndex + 2 > (product?.relevantImage?.length ?? 0) - 1 ? imageActiveIndex - 3 : imageActiveIndex + 2
    ];

  useEffect(() => {
    if (product) {
      // Apply A/B test variations to product content
      applyTestVariation(`productDetailPage-${id}-name`, product.name);
      applyTestVariation(`productDetailPage-${id}-price`, `$${product.price}`);
      applyTestVariation(`productDetailPage-${id}-description`, product.description);
      applyTestVariation(`productDetailPage-${id}-image`, currentImage?.url || "");

      // Track view interactions for A/B testing
      trackTestInteraction(`productDetailPage-${id}-name`, "view");
      trackTestInteraction(`productDetailPage-${id}-price`, "view", product.price);
      trackTestInteraction(`productDetailPage-${id}-description`, "view");
      trackTestInteraction(`productDetailPage-${id}-image`, "view");
      trackTestInteraction(`product-${id}-add-to-cart`, "view");
    }
  }, [product, id, currentImage]);

  const handleBackClick = () => {
    router.back();
  };

  const handleAddToCart = () => {
    if (product) {
      trackTestInteraction(`product-${id}-add-to-cart`, "click", product.price);
      trackTestInteraction(`productDetailPage-${id}-price`, "click", product.price);
    }
  };

  const handleImageClick = () => {
    trackTestInteraction(`product-${id}-image`, "click");
  };

  return (
    <div className="p-10">
      <button className="mb-4" onClick={handleBackClick} data-test-id={`product-${id}-back-button`}>
        <IconArrowLeft fill="black" className="w-8 h-8" />
      </button>

      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <div
            className={cn("relative w-[30vw] aspect-[500/550]", "rounded-lg overflow-hidden")}
            data-test-id={`product-${id}-image-container`}
          >
            <Image
              src={product?.url ?? ""}
              alt={product?.name ?? ""}
              fill
              sizes="(min-width: 0) 50vw"
              className="object-cover cursor-pointer"
              onClick={handleImageClick}
              data-test-id={`product-${id}-image`}
            />
          </div>

          <ProductDetailPageSlider
            images={product?.relevantImage ?? []}
            imageActiveIndex={imageActiveIndex}
            setImageActiveIndex={setImageActiveIndex}
            data-test-id={`product-${id}-image-slider`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div data-test-id={`product-${id}-name-container`}>
            <p className="text-[48px] leading-none font-bold" data-test-id={`product-${id}-name`}>
              {product?.name ?? ""}
            </p>
          </div>
          <div data-test-id={`product-${id}-price-container`}>
            <p className="text-[32px] text-gray-500" data-test-id={`product-${id}-price`}>
              ${product?.price ?? ""}
            </p>
          </div>
          <div data-test-id={`product-${id}-description-container`}>
            <p className="text-gray-500" data-test-id={`product-${id}-description`}>
              {product?.description ?? ""}
            </p>
          </div>

          <div className="mt-6" data-test-id={`product-${id}-cta-container`}>
            <Button className="w-1/5" onClick={handleAddToCart} data-test-id={`product-${id}-add-to-cart`}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
