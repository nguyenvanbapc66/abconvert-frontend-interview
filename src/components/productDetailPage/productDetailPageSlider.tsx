"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { cn } from "@/utils";

type ProductDetailPageSliderProps = {
  images: {
    id: number;
    url: string;
  }[];
  imageActiveIndex: number;
  setImageActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function ProductDetailPageSlider({
  images,
  imageActiveIndex,
  setImageActiveIndex,
}: ProductDetailPageSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handlePrevSlide = () => {
    setImageActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setImageActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX - (sliderRef.current?.offsetLeft || 0));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - (sliderRef.current?.offsetLeft || 0);
    const dragDistance = x - startX;

    if (Math.abs(dragDistance) > 50) {
      // Threshold for slide change
      if (dragDistance > 0) {
        handlePrevSlide();
      } else {
        handleNextSlide();
      }
      setIsDragging(false);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    document.addEventListener("touchend", handleGlobalMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, []);

  return (
    <div className="w-full select-none">
      <div
        className="relative flex justify-center items-center h-[130px]"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleMouseMove}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {images.map((image, index) => {
          const position = (index - imageActiveIndex + images.length) % images.length;
          const isVisible = position >= 0 && position < 5;

          if (!isVisible) return null;

          return (
            <div
              key={image.id}
              className={cn(
                "absolute top-0 w-[130px] aspect-square",
                "rounded-lg overflow-hidden transition-all duration-300",
                position === 2 ? "z-[9]" : "z-[4]",
                position === 1 ? "-translate-x-[60%] scale-90 opacity-90 z-[5]" : "",
                position === 2 ? "translate-x-0 z-10" : "",
                position === 3 ? "translate-x-[60%] scale-90 opacity-90 z-[5]" : "",
                position === 0 ? "-translate-x-[100%] scale-75 opacity-20" : "",
                position === 4 ? "translate-x-[100%] scale-75 opacity-20" : ""
              )}
            >
              <Image
                src={image.url}
                alt="Image"
                fill
                sizes="(min-width: 0) 50vw"
                className="object-cover"
                draggable={false}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-center items-center gap-4 mt-4 h-2">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={cn("w-1 h-1 rounded-full bg-black", {
              "w-2 h-2 border-2 border-black bg-transparent": imageActiveIndex === index,
            })}
          />
        ))}
      </div>
    </div>
  );
}
