import { useQuery } from '@tanstack/react-query'
import axiosApi from '@/services/axiosApi'

export const useRecipients = () => {
  return useQuery({
    queryKey: ['recipients'],
    queryFn: async () => {
      const response = await axiosApi.get('/recipients')
      return response.data
    },
    refetchInterval: 60000, // Refetch every minute
  })
}
