import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosApi from '@/services/axiosApi'

export const useInitializePaystackPayment = () => {
  return useMutation({
    mutationFn: async (data: { amount: number; currency?: string }) => {
      const response = await axiosApi.post(
        '/payments/paystack/initialize',
        data
      )
      return response.data
    },
  })
}

export const useInitializeStripePayment = () => {
  return useMutation({
    mutationFn: async (data: { amount: number; currency?: string }) => {
      const response = await axiosApi.post('/payments/stripe/initialize', data)
      return response.data
    },
  })
}

export const useVerifyPaystackPayment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (reference: string) => {
      const response = await axiosApi.get(
        `/payments/paystack/verify/${reference}`
      )
      return response.data
    },
    onSuccess: () => {
      // Invalidate wallet balance to refetch updated balance
      queryClient.invalidateQueries({ queryKey: ['wallet', 'balance'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}

// Send money mutation
export const useSendMoney = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: {
      amount: number
      currency: string
      description?: string
      recipientId?: string
      manualRecipient?: {
        name: string
        bankDetails: {
          bankName: string
          accountNumber: string
          accountName: string
        }
        country: string
        currency: string
        saveAsRecipient: boolean
      }
    }) => {
      const response = await axiosApi.post('/payments/send', data)
      return response.data
    },
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['wallet', 'balance'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['recipients'] })
    },
  })
}
