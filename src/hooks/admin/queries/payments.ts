import { useQuery, useQueryClient } from '@tanstack/react-query'
import axiosApi from '@/services/axiosApi'

export const useExchangeRates = () => {
  return useQuery({
    queryKey: ['exchange-rates'],
    queryFn: async () => {
      const response = await axiosApi.get('/payments/exchange-rates')
      return response.data
    },
    refetchInterval: 60000, // Refetch every minute
  })
}

// Currency pair rate query
export const useCurrencyPairRate = (from: string, to: string) => {
  return useQuery({
    queryKey: ['currency-pair', from, to],
    queryFn: async () => {
      const response = await axiosApi.get(
        `/payments/exchange-rates/${from}/${to}`
      )
      return response.data
    },
    enabled: !!(from && to && from !== to),
    refetchInterval: 60000,
    staleTime: 30000,
  })
}

// Currency conversion query
export const useCurrencyConversion = (
  amount: number,
  from: string,
  to: string
) => {
  return useQuery({
    queryKey: ['currency-conversion', amount, from, to],
    queryFn: async () => {
      const response = await axiosApi.get(
        `/payments/convert?amount=${amount}&from=${from}&to=${to}`
      )
      return response.data
    },
    enabled: !!(amount && amount > 0 && from && to && from !== to),
    refetchInterval: 60000,
    staleTime: 30000,
  })
}

// Historical rates query
export const useHistoricalRates = (date: string) => {
  return useQuery({
    queryKey: ['historical-rates', date],
    queryFn: async () => {
      const response = await axiosApi.get(`/payments/historical-rates/${date}`)
      return response.data
    },
    enabled: !!date,
    staleTime: 24 * 60 * 60 * 1000, // Historical data is stable for 24 hours
  })
}

// Real-time exchange rate subscription hook
import { useEffect } from 'react'

export const useRealTimeExchangeRates = () => {
  const queryClient = useQueryClient()

  const queryResult = useQuery({
    queryKey: ['exchange-rates', 'realtime'],
    queryFn: async () => {
      const response = await axiosApi.get('/payments/exchange-rates')
      return response.data
    },
    refetchInterval: 30000, // Update every 30 seconds
    refetchIntervalInBackground: true,
  })

  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data) {
      // Update the main exchange rates cache
      queryClient.setQueryData(['exchange-rates'], queryResult.data)
    }
  }, [queryResult.isSuccess, queryResult.data, queryClient])

  return queryResult
}
