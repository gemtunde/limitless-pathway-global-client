import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosApi from "@/services/axiosApi";
import { TeamMemberFormData } from "@/app/admin/team/page";

export const useCreateTeam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TeamMemberFormData) => {
      const response = await axiosApi.post("/team", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
};

// update team
export const useUpdateTeam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
      id,
    }: {
      data: TeamMemberFormData;
      id: string;
    }) => {
      const response = await axiosApi.put(`/team/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
};

// Delete team
export const useDeleteTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosApi.delete(`/team/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
};
