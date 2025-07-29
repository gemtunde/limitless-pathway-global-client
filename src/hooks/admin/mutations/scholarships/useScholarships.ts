import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosApi from "@/services/axiosApi";
import { ScholarshipFormData } from "@/app/admin/scholarships/page";

export const useCreateScholarships = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ScholarshipFormData) => {
      const response = await axiosApi.post("/scholarships", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scholarships"] });
    },
  });
};

// update scholarship
export const useUpdateScholarships = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
      id,
    }: {
      data: ScholarshipFormData;
      id: string;
    }) => {
      const response = await axiosApi.put(`/scholarships/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scholarships"] });
    },
  });
};

// Delete scholarship
export const useDeleteScholarship = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosApi.delete(`/scholarships/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scholarships"] });
    },
  });
};
