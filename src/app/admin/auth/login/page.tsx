"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { loginFormSchema, LoginFormData } from "@/lib/validations";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useLogin from "@/hooks/admin/mutations/auth/useLogin";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  //const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });
  const router = useRouter();
  //const router = useRouter();

  // Mutations
  const login = useLogin();
  const { setAuth } = useAuthStore();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login.mutateAsync(data);
      if (response.status === 200) {
        console.log("Login successful:", response.data.data);
        const { user, token } = response.data.data; // Adjust based on your API response structure
        setAuth(user, token);
        console.log("USER ====>>Login successful TKEN:", user, token);
        toast.success(
          response.data.data.message || "User has been logged in successfully!"
        );
        router.push("/admin");
      } else {
        // Handle error response
        console.error("Login failed:", response.data);
        toast.error(
          response.data.data.message || "Login failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        toast.error(error.message || "An error occurred during login.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      return;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
          //  src="https://images.unsplash.com/photo-1587748988277-56f8a9eb99e4?q=80&auto=format&fit=crop&w=2070"
          alt="Study session"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-blue-900/20"></div>
        <div className="relative z-10 flex items-end p-8">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
            <p className="text-xl text-blue-100">
              Continue your study abroad journey with Limitless Global Pathways
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Sign In</CardTitle>
                <CardDescription className="text-center">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className={errors.email ? "border-red-500" : ""}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        className={errors.password ? "border-red-500" : ""}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      href="/admin/auth/forgot-password"
                      className="text-sm text-blue-600 hover:text-blue-500"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={login.isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {login.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/admin/auth/register"
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
