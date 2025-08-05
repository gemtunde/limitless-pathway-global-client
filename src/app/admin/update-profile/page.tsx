"use client";

//import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//import { Eye, EyeOff, Loader2 } from "lucide-react";
import { ProfileFormData, ProfileFormSchema } from "@/lib/validations";
//import useChangePassword from "@/hooks/admin/mutations/change-password/useChangePassword";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";
//import { useLogout } from "@/hooks/admin/mutations/auth/useLogout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUploadZone from "@/components/form/ImageUploadZone";
import useUpdateProfile from "@/hooks/admin/mutations/update-profile/useUpdateProfile";
import { Loader2 } from "lucide-react";

export default function UpdateProfile() {
  const { user, setAuth } = useAuthStore();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      image: user?.image || "",
    },
  });

  const updateProfileMutation = useUpdateProfile();

  const onSubmit = async (data: ProfileFormData) => {
    const payload = {
      id: user?.id as string,
      firstName: data?.firstName,
      lastName: data?.lastName,
      image: data?.image as string,
    };
    try {
      console.log("Update Profile:", data);
      // Add your update profile mutation here
      updateProfileMutation.mutate(payload, {
        onSuccess: (res) => {
          const { user, token } = res.data.data; // Adjust based on your API response structure
          setAuth(user, token);

          toast.success(
            res.data.data.message ?? "Profile updated successfully"
          );
        },
        onError: (error) => {
          toast.error(error?.message ?? "An error occurred. Please try again");
        },
      });
    } catch (error) {
      console.error("Update Profile error:", error);
    }
  };

  return (
    <div className="min-h-screen">
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
                  Update Profile
                </CardTitle>
                <CardDescription className="text-center">
                  Update your profile details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter your first name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter your last name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              disabled
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile Image</FormLabel>
                          <FormControl>
                            <ImageUploadZone
                              label=""
                              description="Upload a profile image (max 4MB)"
                              value={field.value}
                              onChange={(url) => field.onChange(url || "")}
                              disabled={updateProfileMutation.isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={updateProfileMutation.isPending}
                      className="w-full"
                    >
                      {updateProfileMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Updating Profile...
                        </>
                      ) : (
                        "Update Profile"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
