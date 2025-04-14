import type { Metadata } from "next";

import { MainLayout } from "@/components";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout",
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout className="min-h-screen font-[family-name:var(--font-geist-sans)]">{children}</MainLayout>;
}
