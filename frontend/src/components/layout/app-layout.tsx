import type { ReactNode } from "react";
import { Header } from "./header";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-20 px-6">{children}</main>
    </div>
  );
}
