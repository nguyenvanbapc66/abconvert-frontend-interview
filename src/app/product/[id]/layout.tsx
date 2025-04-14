import type { Metadata } from "next";

import { MainLayout } from "@/components";

export const metadata: Metadata = {
  title: "Details",
  description: "Details",
};

export default function DetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout className="min-h-screen font-[family-name:var(--font-geist-sans)]">{children}</MainLayout>;
}
