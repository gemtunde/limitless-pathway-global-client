"use client";
//import type { Metadata } from "next";
//import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");
  return (
    <html lang="en">
      <body
        // className={`${inter.className} antialiased`}
        suppressHydrationWarning={true}
      >
        <Providers>
          {!isAdmin && <Header />}
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
