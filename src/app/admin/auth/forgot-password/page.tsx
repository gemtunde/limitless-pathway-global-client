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
import {
  forgotPasswordFormData,
  forgotPasswordFormSchema,
} from "@/lib/validations";
import Image from "next/image";
import useForgotPassword from "@/hooks/admin/mutations/auth/useForgotPassword";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ForgotPassword() {
  //const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<forgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordFormSchema),
  });
  const email = watch("email");

  const ForgotPasswordMutation = useForgotPassword();

  const onSubmit = async (data: forgotPasswordFormData) => {
    try {
      console.log("Forgot Password:", data);
      ForgotPasswordMutation.mutate(
        {
          email: data?.email,
        },
        {
          onSuccess: async (res) => {
            toast.success(res.data.message ?? "Email sent was successful");
            //router.push('/home')
          },
          onError: (error) => {
            toast.error(error?.message ?? "An error occured. Pls try again");
          },
        }
      );
      setShowNotice(true);
    } catch (error) {
      console.error("Forgot Password error:", error);
    }
  };

  // const onSubmit = async (data: forgotPasswordFormData) => {
  //   setIsSubmitting(true);

  //   // Simulate API call
  //   await new Promise((resolve) => setTimeout(resolve, 2000));

  //   console.log("forgot password submitted:", data);
  //   setIsSubmitting(false);

  //   // Handle login logic here
  //   // redirect to dashboard or home page
  // };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop"
          alt="Student studying with laptop"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-purple-900/20"></div>
        <div className="relative z-10 flex items-end p-8">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">Reset Your Password</h1>
            <p className="text-xl text-purple-100">
              Don&apos;t worry, we&apos;ll help you get back to your study
              abroad journey
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      {showNotice ? (
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-lg font-bold">Check Your Email</h1>
          <p className="mt-2 text-gray-600">
            A password reset email has been sent to {email}. Click the link to
            <Link
              className="ml-1 text-green-700 font-semibold cursor-pointer"
              href="/admin/auth/login"
            >
              Login.
            </Link>
          </p>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-md w-full space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl text-center">
                    Forgot Password
                  </CardTitle>
                  <CardDescription className="text-center">
                    Please enter your email to reset your password
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

                    <Button
                      type="submit"
                      disabled={ForgotPasswordMutation.isPending}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {ForgotPasswordMutation.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Creating New Password...
                        </>
                      ) : (
                        "Create New Password"
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      Have an account?{" "}
                      <Link
                        href="/admin/auth/login"
                        className="text-blue-600 hover:text-blue-500 font-medium"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
