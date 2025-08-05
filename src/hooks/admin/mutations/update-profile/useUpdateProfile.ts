import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import axiosApi from "@/services/axiosApi";

// export type UpdateProfileResponseType = {
//   firstName: string;
//   lastName: string;
//   image: string;
//   message: string;
// };
export type UpdateProfileResponseType = {
  data: {
    message: string;
    token: string;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      image?: string;
      isEmailVerified: boolean;
    };
  };
};

type UpdateProfileInputType = {
  firstName: string;
  lastName: string;
  image: string;
  id: string;
};

const UpdateProfile = (
  input: UpdateProfileInputType
): Promise<AxiosResponse<UpdateProfileResponseType>> => {
  return axiosApi.put(`auth/update-profile/${input.id}`, input);
};

const useUpdateProfile = () => {
  return useMutation<
    AxiosResponse<UpdateProfileResponseType>,
    AxiosError,
    UpdateProfileInputType
  >({
    mutationFn: (input: UpdateProfileInputType) => UpdateProfile(input),
  });
};

export default useUpdateProfile;
