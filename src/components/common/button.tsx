import { cn } from "@/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "w-full bg-black text-white px-4 py-2 rounded-lg text-lg font-bold hover:opacity-60 transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
