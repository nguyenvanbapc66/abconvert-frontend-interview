"use client";
import { useRouter } from "next/navigation";

import { IconArrowLeft } from "@/assets/icons";
import { Button, Input } from "@/components";

export default function CheckoutPageStyled() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="p-10">
      <button className="mb-4" onClick={handleBackClick}>
        <IconArrowLeft fill="black" className="w-8 h-8" />
      </button>

      <form onSubmit={handleSubmit}>
        <div className="max-w-2xl mx-auto bg-[#FFFAE9] rounded-lg p-10 border border-[#0000001A]">
          <div className="flex flex-col gap-3 mb-6">
            <p className="text-2xl font-bold">Address</p>

            <Input placeholder="John Doe" />
            <Input placeholder="Country" />
            <Input placeholder="Street" />
            <Input placeholder="City" />
            <div className="flex gap-2">
              <Input placeholder="State" />
              <Input placeholder="ZIP" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-2xl font-bold">Card Information</p>

            <Input placeholder="Card Number" />
            <div className="flex gap-2">
              <Input placeholder="Expiration Date" />
              <Input placeholder="CVC" />
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <Button type="submit" className="w-fit text-2xl font-bold px-12">
              Order
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
