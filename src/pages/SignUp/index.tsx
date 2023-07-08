import { useSignUp } from "@hooks/useSignUp";
import {
  Button,
  Card,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function SignUp() {
  const { formikProps, mutationCreate } = useSignUp();

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card color="white" className="p-8">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form
          onSubmit={formikProps.handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              name="fullName"
              size="lg"
              label="Name"
              error={
                Boolean(formikProps.errors.fullName) &&
                Boolean(formikProps.touched.fullName)
              }
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
            />
            <Input
              name="email"
              size="lg"
              label="Email"
              error={
                Boolean(formikProps.errors.email) &&
                Boolean(formikProps.touched.email)
              }
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
            />
            <Input
              name="password"
              type="password"
              size="lg"
              label="Password"
              error={
                Boolean(formikProps.errors.password) &&
                Boolean(formikProps.touched.password)
              }
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
            />

            <Input
              name="confirmPassword"
              type="password"
              size="lg"
              label="Confirm Password"
              error={
                Boolean(formikProps.errors.confirmPassword) &&
                Boolean(formikProps.touched.confirmPassword)
              }
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
            />

            <Typography variant="small" className="text-red-500 -mt-5">
              {(formikProps.errors.fullName &&
                formikProps.touched.fullName &&
                formikProps.errors.fullName) ||
                (formikProps.errors.email &&
                  formikProps.touched.email &&
                  formikProps.errors.email) ||
                (formikProps.errors.password &&
                  formikProps.touched.password &&
                  formikProps.errors.password) ||
                (formikProps.errors.confirmPassword &&
                  formikProps.touched.confirmPassword &&
                  formikProps.errors.confirmPassword)}
            </Typography>
          </div>

          <Button
            className="mt-6 flex items-center justify-center "
            fullWidth
            size="lg"
            disabled={mutationCreate.isLoading}
            type="submit"
          >
            {mutationCreate.isLoading ? (
              <Spinner className="h-5 w-5" color="cyan" />
            ) : (
              "Register"
            )}
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <Link
              to="/"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
