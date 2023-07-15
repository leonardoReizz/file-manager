import { QueryClientProvider, useMutation, useQueryClient } from "react-query";
import apiUser from "@services/http/user/index";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useUserContext } from "./context/useUserContext";
import { DefaultApiResponse } from "@services/types";

export function useProfileSettings() {
  const queryClient = useQueryClient();
  const { user } = useUserContext();

  const initialValues = {
    fullName: user.fullName,
    email: user.email,
  };

  console.log("a");
  console.log(queryClient.getQueryData("manageFolders"), " a");

  const mutationUpdateProfile = useMutation({
    mutationFn: (values: typeof initialValues) => {
      return apiUser.updateUser({ id: user._id, ...values });
    },
    onSuccess: (response: DefaultApiResponse) => {
      queryClient.setQueryData("user", (currentData) => {
        console.log(currentData, response);
        if (currentData) {
          return {
            ...currentData,
            email: response.data.message.email,
            fullName: response.data.message.fullName,
          };
        }
        return currentData;
      });

      toast.success("User updated");
    },
    onError: (error: AxiosError) => {
      if (error?.response?.status === 400) {
        toast.error("Email already exists");
      } else {
        toast.error("Unexpected error");
      }
    },
  });

  const formikProps = useFormik({
    initialValues,
    onSubmit: (values) => mutationUpdateProfile.mutate(values),
    enableReinitialize: true,
  });

  return { formikProps, mutationUpdateProfile };
}
