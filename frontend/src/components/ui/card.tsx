import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: Props) {
  const base =
    "p-4 rounded-lg bg-gray-900 border border-gray-700 shadow-md";

  return <div className={`${base} ${className || ""}`}>{children}</div>;
}
