import { useSignIn } from "@hooks/useSignIn";
import {
  Button,
  Card,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function SignIn() {
  const { formikProps, mutationSignIn } = useSignIn();
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card color="white" className="p-8">
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to login.
        </Typography>
        <form
          onSubmit={formikProps.handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              name="email"
              size="lg"
              label="Email"
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
            />
            <Input
              name="password"
              type="password"
              size="lg"
              label="Password"
              onChange={formikProps.handleChange}
              onBlur={formikProps.handleBlur}
            />
            <Typography variant="small" className="text-red-500 -mt-5">
              {(formikProps.errors.email &&
                formikProps.touched.email &&
                formikProps.errors.email) ||
                (formikProps.errors.password &&
                  formikProps.touched.password &&
                  formikProps.errors.password)}
            </Typography>
          </div>

          <Button
            className="mt-6 flex items-center justify-center "
            fullWidth
            size="lg"
            disabled={mutationSignIn.isLoading}
            type="submit"
          >
            {mutationSignIn.isLoading ? (
              <Spinner className="h-5 w-5" color="cyan" />
            ) : (
              "Enter"
            )}
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
