import { useQuery } from '@tanstack/react-query'
import axiosApi from '@/services/axiosApi'

// Wallet balance query
export const useWalletBalance = () => {
  return useQuery({
    queryKey: ['wallet', 'balance'],
    queryFn: async () => {
      const response = await axiosApi.get('wallet/balance', {
        withCredentials: true,
      })
      return response.data
    },
    retry: false,
  })
}
