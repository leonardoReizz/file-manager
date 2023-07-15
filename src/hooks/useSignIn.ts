import { useFormik } from "formik";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import * as Yup from "yup";
import apiAuthenticate from "@services/http/auth/index";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { DefaultApiResponse } from "@services/types";
import Cookies from "js-cookie";
import { useEffect } from "react";

export function useSignIn() {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const mutationSignIn = useMutation({
    mutationFn: async (values: typeof initialValues) => {
      return apiAuthenticate.signIn(values);
    },
    onSuccess: (response: DefaultApiResponse) => {
      const expirationDateToken = new Date();
      const expirationDateRefreshToken = new Date();
      expirationDateRefreshToken.setTime(
        expirationDateRefreshToken.getTime() + 7 * 60 * 60 * 1000
      ); // 7 hours to milliseconds
      expirationDateToken.setTime(
        expirationDateToken.getTime() + 50 * 60 * 1000
      ); // 50 minutes to milissegundos

      Cookies.set(
        "leviFileRefresh",
        `bearer ${response.data.message.refreshToken}`,
        { expires: expirationDateRefreshToken }
      );
      Cookies.set(
        "leviFileToken",
        `bearer ${response.data.message.accessToken}`,
        { expires: expirationDateToken }
      );
      formikProps.resetForm();
      navigate("/home");
    },
    onError: (error: AxiosError) => {
      if (error?.response?.status === 400) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Unexpected error");
      }
    },
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .max(100, "Email cannot be more than 100 characters")
      .required("Email is a required field"),
    password: Yup.string()
      .min(8, "Invalid password")
      .max(32, "Invalid password")
      .required("Password is a required field"),
  });

  const formikProps = useFormik({
    initialValues,
    onSubmit: (values) => mutationSignIn.mutate(values),
    validationSchema,
  });

  useEffect(() => {
    if (Cookies.get("leviFileRefresh")) {
      navigate("/home");
    }
  }, []);

  return { formikProps, mutationSignIn };
}
