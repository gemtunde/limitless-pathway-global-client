import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosApi from "@/services/axiosApi";
import { FaqFormData } from "@/app/admin/faq/page";

export const useCreateFaq = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FaqFormData) => {
      const response = await axiosApi.post("/faqs", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    },
  });
};

// update faq
export const useUpdateFaq = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: { data: FaqFormData; id: string }) => {
      const response = await axiosApi.put(`/faqs/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    },
  });
};

// Delete faq
export const useDeleteFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosApi.delete(`/faqs/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    },
  });
};
