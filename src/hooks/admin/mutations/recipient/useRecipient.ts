import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosApi from '@/services/axiosApi'

// Create recipient mutation
export const useCreateRecipient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: {
      name: string
      email?: string
      phoneNumber?: string
      bankDetails?: {
        bankName: string
        bankCode: string
        accountNumber: string
        accountName: string
      }
      country: string
      currency: string
    }) => {
      const response = await axiosApi.post('/recipients', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipients'] })
    },
  })
}

// Update recipient mutation
export const useUpdateRecipient = () => {
  const queryClient = useQueryClient()

  interface UpdateRecipientData {
    id: string
    name?: string
    email?: string
    phoneNumber?: string
    bankDetails?: {
      bankName?: string
      bankCode?: string
      accountNumber?: string
      accountName?: string
    }
    country?: string
    currency?: string
    [key: string]: unknown
  }

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateRecipientData) => {
      const response = await axiosApi.put(`/recipients/${id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipients'] })
    },
  })
}

// Delete recipient mutation
export const useDeleteRecipient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosApi.delete(`/recipients/${id}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipients'] })
    },
  })
}
