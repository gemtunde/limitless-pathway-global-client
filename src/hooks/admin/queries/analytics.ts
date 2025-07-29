import { useQuery } from '@tanstack/react-query'
//import { api } from '@/lib/api';
import axiosApi from '@/services/axiosApi'

// Analytics query for transaction data
export const useTransactionAnalytics = (period: string = '6months') => {
  return useQuery({
    queryKey: ['analytics', 'transactions', period],
    queryFn: async () => {
      const response = await axiosApi.get(
        `/analytics/transactions?period=${period}`
      )
      return response.data
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  })
}

// Monthly transaction summary
export const useMonthlyTransactionSummary = () => {
  return useQuery({
    queryKey: ['analytics', 'monthly-summary'],
    queryFn: async () => {
      const response = await axiosApi.get('/analytics/monthly-summary')
      return response.data
    },
    refetchInterval: 60 * 60 * 1000, // Refetch every hour
  })
}

// Currency breakdown analytics
export const useCurrencyBreakdown = () => {
  return useQuery({
    queryKey: ['analytics', 'currency-breakdown'],
    queryFn: async () => {
      const response = await axiosApi.get('/analytics/currency-breakdown')
      return response.data
    },
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
  })
}
