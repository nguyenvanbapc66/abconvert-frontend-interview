import { cn } from "@/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-md border border-[#413A2C] py-2 px-4 bg-[#FFFFFFCC] text-sm font-medium outline-none",
        "focus:border-[#FFCD1F] focus:bg-[#191403] focus:text-[#FFCD1F]",
        "transition-all duration-300",
        className
      )}
    />
  );
};

export default Input;
