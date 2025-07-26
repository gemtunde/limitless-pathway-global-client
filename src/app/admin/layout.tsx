"use client";

import { Header } from "@/components/admin/layout/Header";
import { Sidebar } from "@/components/admin/layout/Sidebar";
import { ToastProvider } from "@/components/providers/ToastProvider";
//import { Sidebar } from "@/components/admin/Sidebar";
//import { Header } from "@/components/admin/Header";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-16 bg-muted/40">
          {children}
        </main>
      </div>
      <ToastProvider />
    </div>
  );
}
