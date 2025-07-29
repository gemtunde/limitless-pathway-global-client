import { useQuery } from '@tanstack/react-query'

import axiosApi from '@/services/axiosApi'
// Get funding sources
export const useFundingSources = () => {
  return useQuery({
    queryKey: ['funding-sources'],
    queryFn: async () => {
      const response = await axiosApi.get('/funding-sources')
      return response.data
    },
  })
}
