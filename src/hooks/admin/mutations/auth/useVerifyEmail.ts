import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import axiosApi from '@/services/axiosApi'

export type VerifyEmailResponseType = {
  message: string
  accessToken: string
  refreshToken: string
}

type VerifyEmailInputType = {
  token: string
}

const VerifyEmail = (
  input: VerifyEmailInputType
): Promise<AxiosResponse<VerifyEmailResponseType>> => {
  return axiosApi.post(`auth/verify-email/${input.token}`)
}

const useVerifyEmail = () => {
  return useMutation<
    AxiosResponse<VerifyEmailResponseType>,
    AxiosError,
    VerifyEmailInputType
  >({
    mutationFn: (input: VerifyEmailInputType) => VerifyEmail(input),
  })
}

export default useVerifyEmail

// import { useQuery } from '@tanstack/react-query'
// import axiosApi from '@/services/axiosApi'

// // email verification query
// export const useVerifyEmail = (token: string) => {
//   return useQuery({
//     queryKey: ['auth', 'verify-email', token],
//     queryFn: async () => {
//       if (!token) {
//         throw new Error('No verification token found in the URL.')
//       }
//       const response = await axiosApi.get(`/auth/verify-email/${token}`)
//       return response.data
//     },
//     enabled: !!token,
//     retry: false,
//     refetchOnWindowFocus: false,
//   })
// }
