"use client";

import { Header } from "@/components/admin/layout/Header";
import { Sidebar } from "@/components/admin/layout/Sidebar";
import AuthGuard from "@/components/AuthGuard";
import { usePathname } from "next/navigation";

import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuth = pathname.startsWith("/admin/auth");
  return (
    <AuthGuard requireAuth={true}>
      <div className="flex h-screen w-full">
        {!isAuth && <Sidebar />}
        <div className="flex-1 flex flex-col overflow-hidden">
          {!isAuth && <Header />}
          <main className="flex-1 overflow-auto bg-muted/40 p-10">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
