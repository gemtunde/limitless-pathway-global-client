import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosApi from "@/services/axiosApi";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const { logout } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axiosApi.post("/auth/logout"),
    onSuccess: () => {
      logout();
      queryClient.clear();
      toast.success("Logged out successfully");
      router.push("/admin/auth/login");
    },
    onError: () => {
      logout();
      queryClient.clear();
      router.push("/admin/auth/login");
      toast.success("Logged out successfully");
    },
  });
};
