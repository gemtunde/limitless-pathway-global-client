import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import axiosApi from "@/services/axiosApi";

export type LoginResponseType = {
  data: {
    message: string;
    token: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      isEmailVerified: boolean;
      image?: string;
    };
  };
};

type LoginInputType = {
  password: string;
  email: string;
};

const login = (
  input: LoginInputType
): Promise<AxiosResponse<LoginResponseType>> => {
  return axiosApi.post("auth/login", input);
};

const useLogin = () => {
  return useMutation<
    AxiosResponse<LoginResponseType>,
    AxiosError,
    LoginInputType
  >({
    mutationFn: (input: LoginInputType) => login(input),
  });
};

export default useLogin;
