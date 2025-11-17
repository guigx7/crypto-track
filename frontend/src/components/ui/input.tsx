import type { InputHTMLAttributes } from "react";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  const base =
    "w-full px-4 py-2 rounded-md outline-none transition focus:ring-2 focus:ring-blue-600";

  const style =
    "bg-gray-900 border border-gray-700 text-white placeholder-gray-400";

  return (
    <input
      className={`${base} ${style} ${className || ""}`}
      {...props}
    />
  );
}
