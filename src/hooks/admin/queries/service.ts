"use client";
import { useQuery } from "@tanstack/react-query";
import axiosApi from "@/services/axiosApi";

export const useService = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["services", page, limit],
    queryFn: async () => {
      const response = await axiosApi.get(
        `/services?page=${page}&limit=${limit}`
      );
      return response.data;
    },
    refetchInterval: 3600000,
  });
};
