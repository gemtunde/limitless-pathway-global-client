import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosApi from "@/services/axiosApi";
import {
  Scholarship,
  ScholarshipFormData,
} from "@/app/admin/scholarships/page";

// Create funding source
// export const useCreateFundingSource = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: async (data: {
//       type: 'bank' | 'card'
//       // Bank fields
//       routingNumber?: string
//       accountNumber?: string
//       accountType?: string
//       bankName?: string
//       // Card fields
//       cardNumber?: string
//       expiryMonth?: string
//       expiryYear?: string
//       cvv?: string
//       cardholderName?: string
//       billingZip?: string
//     }) => {
//       const response = await axiosApi.post('/funding-sources', data)
//       return response.data
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['funding-sources'] })
//     },
//   })
// }

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

// Set primary funding source
// export const useSetPrimaryFundingSource = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (id: string) => {
//       const response = await axiosApi.patch(`/funding-sources/${id}/primary`);
//       return response.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["funding-sources"] });
//     },
//   });
// };
