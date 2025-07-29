import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosApi from "@/services/axiosApi";

import { CountryFormData } from "@/app/admin/countries/page";

export const useCreateCountries = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CountryFormData) => {
      const response = await axiosApi.post("/countries", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
    },
  });
};

// update country
export const useUpdateCountries = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: { data: CountryFormData; id: string }) => {
      const response = await axiosApi.put(`/countries/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
    },
  });
};

// Delete country
export const useDeleteCountries = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosApi.delete(`/countries/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
    },
  });
};
