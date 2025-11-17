import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, className, ...props }: Props) {
  const base =
    "px-4 py-2 rounded-md font-medium transition active:scale-[0.98]";

  const style =
    "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <button className={`${base} ${style} ${className || ""}`} {...props}>
      {children}
    </button>
  );
}
