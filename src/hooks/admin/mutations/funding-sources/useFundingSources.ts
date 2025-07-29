import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosApi from '@/services/axiosApi'

// Create funding source
export const useCreateFundingSource = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: {
      type: 'bank' | 'card'
      // Bank fields
      routingNumber?: string
      accountNumber?: string
      accountType?: string
      bankName?: string
      // Card fields
      cardNumber?: string
      expiryMonth?: string
      expiryYear?: string
      cvv?: string
      cardholderName?: string
      billingZip?: string
    }) => {
      const response = await axiosApi.post('/funding-sources', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['funding-sources'] })
    },
  })
}

// Delete funding source
export const useDeleteFundingSource = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosApi.delete(`/funding-sources/${id}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['funding-sources'] })
    },
  })
}

// Set primary funding source
export const useSetPrimaryFundingSource = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosApi.patch(`/funding-sources/${id}/primary`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['funding-sources'] })
    },
  })
}
