import { IconMinus, IconPlus } from "@/assets/icons";

type CartPageQuantityProps = {
  quantity: number;
  onMinusClick?: () => void;
  onPlusClick?: () => void;
};

export default function CartPageQuantity({ quantity, onMinusClick, onPlusClick }: CartPageQuantityProps) {
  return (
    <div className="flex items-center">
      <button className="border border-r-0 border-gray-300 p-[6px] rounded-l-full" onClick={onMinusClick}>
        <IconMinus className="h-5 w-5" />
      </button>
      <div className="border border-gray-300 w-16">
        <input type="text" className="p-[6px] w-full text-center text-sm" value={quantity ?? 0} />
      </div>
      <button className="border border-l-0 border-gray-300 p-[6px] rounded-r-full" onClick={onPlusClick}>
        <IconPlus className="h-5 w-5" />
      </button>
    </div>
  );
}
