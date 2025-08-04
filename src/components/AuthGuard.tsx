// components/AuthGuard.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
//import { useAuth } from '@/hooks/auth/useAuth';
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function AuthGuard({
  children,
  requireAuth = true,
}: AuthGuardProps) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.push("/admin/auth/login");
    } else if (!requireAuth && isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, requireAuth, router]);

  // Show loading while checking auth state
  //   if (requireAuth && !isAuthenticated) {
  //     return (
  //       <div className="min-h-screen flex items-center justify-center">
  //         <div className="text-center">
  //           <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
  //           <p className="text-gray-600">Loading tunde...</p>
  //         </div>
  //       </div>
  //     );
  //   }

  // For non-auth pages, redirect if already authenticated
  if (!requireAuth && isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
