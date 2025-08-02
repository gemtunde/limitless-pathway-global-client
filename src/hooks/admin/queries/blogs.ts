"use client";
import { useQuery } from "@tanstack/react-query";
import axiosApi from "@/services/axiosApi";

export const useBlogs = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["blogs", page, limit],
    queryFn: async () => {
      const response = await axiosApi.get(`/blog?page=${page}&limit=${limit}`);
      return response.data;
    },
    refetchOnWindowFocus: true,
  });
};

export const useBlogBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["blogs-slug", slug],
    queryFn: async () => {
      const response = await axiosApi.get(`/blog/slug/${slug}`);
      return response.data;
    },
    refetchOnWindowFocus: true,
  });
};
