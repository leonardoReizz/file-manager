import { useMutation } from "react-query";
import apiUser from "@services/http/user/index";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export function useSecuritySettings() {
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const mutationChangePassword = useMutation({
    mutationFn: (values: typeof initialValues) => {
      return apiUser.changePassword({
        newPassword: values.newPassword,
        currentPassword: values.currentPassword,
      });
    },
    onSuccess: () => {
      formikProps.resetForm();
      toast.success("Password updated");
    },
    onError: (error: AxiosError) => {
      if (error?.response?.status === 400) {
        toast.error("Invalid current password");
      } else {
        toast.error("Unexpected error");
      }
    },
  });

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .min(8, "Invalid password")
      .max(32, "Invalid password")
      .required("Current Password is a required field"),
    newPassword: Yup.string()
      .min(8, "New password must contain at least 8 characters")
      .max(32, "New password must contain a maximum of 32 characters")
      .required("New Password is a required field"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm New Password is a required field"),
  });

  const formikProps = useFormik({
    initialValues,
    onSubmit: (values) => mutationChangePassword.mutate(values),
    validationSchema,
  });

  return { mutationChangePassword, formikProps };
}
