import type { Metadata } from "next";

import { MainLayout } from "@/components";

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout className="min-h-screen font-[family-name:var(--font-geist-sans)]">{children}</MainLayout>;
}
