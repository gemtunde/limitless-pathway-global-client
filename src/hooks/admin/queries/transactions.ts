'use client'
import { useQuery } from '@tanstack/react-query'
import axiosApi from '@/services/axiosApi'
// Transaction history query
export const useTransactionHistory = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['transactions', page, limit],
    queryFn: async () => {
      const response = await axiosApi.get(
        `/transactions?page=${page}&limit=${limit}`
      )
      return response.data
    },
    refetchInterval: 60000,
  })
}
