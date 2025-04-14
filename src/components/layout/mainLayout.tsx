import "@/styles/globals.css";

import localFont from "next/font/local";

import { cn } from "@/utils";

const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function MainLayout({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <html lang="en">
      <body className={cn(`${geistSans.variable} ${geistMono.variable} antialiased`, className)}>{children}</body>
    </html>
  );
}
