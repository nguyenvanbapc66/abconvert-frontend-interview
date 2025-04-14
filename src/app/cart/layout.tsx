import type { Metadata } from "next";

import { MainLayout } from "@/components";

export const metadata: Metadata = {
  title: "Cart",
  description: "Cart",
};

export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout className="min-h-screen font-[family-name:var(--font-geist-sans)]">{children}</MainLayout>;
}
