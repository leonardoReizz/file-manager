import { useFormik } from "formik";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import * as Yup from "yup";
import apiUser from "@services/http/user/index";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export function useSignUp() {
  const navigate = useNavigate();

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const mutationCreate = useMutation({
    mutationFn: async (values: typeof initialValues) => {
      return apiUser.createUser(values);
    },
    onSuccess: () => {
      toast.success("User created");
      formikProps.resetForm();

      navigate("/");
    },
    onError: (error: AxiosError) => {
      if (error?.response?.status === 400) {
        toast.error("Email already registered");
      } else {
        toast.error("Unexpected error");
      }
    },
  });

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Name is a required field")
      .max(52, "Name cannot be more than 52")
      .min(5, "Name must be 5 characters"),
    email: Yup.string()
      .email("Invalid email")
      .max(100, "Email cannot be more than 100 characters")
      .required("Email is a required field"),
    password: Yup.string()
      .min(8)
      .max(32)
      .required("Password is a required field"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is a required field"),
  });

  const formikProps = useFormik({
    initialValues,
    onSubmit: (values) => mutationCreate.mutate(values),
    validationSchema,
  });

  return { formikProps, mutationCreate };
}
