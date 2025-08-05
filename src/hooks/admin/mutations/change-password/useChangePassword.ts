import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import axiosApi from "@/services/axiosApi";

export type ChangePasswordResponseType = {
  message: string;
  accessToken: string;
  refreshToken: string;
};

type ChangePasswordInputType = {
  currentPassword: string;
  newPassword: string;
  id: string;
};

const ChangePassword = (
  input: ChangePasswordInputType
): Promise<AxiosResponse<ChangePasswordResponseType>> => {
  return axiosApi.put(`auth/change-password/${input.id}`, input);
};

const useChangePassword = () => {
  return useMutation<
    AxiosResponse<ChangePasswordResponseType>,
    AxiosError,
    ChangePasswordInputType
  >({
    mutationFn: (input: ChangePasswordInputType) => ChangePassword(input),
  });
};

export default useChangePassword;
