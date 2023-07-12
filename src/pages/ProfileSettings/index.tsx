import { useProfileSettings } from "@hooks/useProfileSettings";
import { Button, Input, Spinner, Typography } from "@material-tailwind/react";

export function ProfileSettings() {
  const { mutationUpdateProfile, formikProps } = useProfileSettings();

  return (
    <div className="w-full flex-col flex gap-10">
      <div>
        <Typography variant="h5">User Information</Typography>
        <Typography variant="small">
          Here you can edit public information about yourself.
        </Typography>
      </div>

      <div className="w-full">
        <form
          onSubmit={formikProps.handleSubmit}
          className="w-full max-w-[500px] flex flex-col gap-4"
        >
          <Input
            label="Email address"
            name="Email"
            value={formikProps.values.email}
            onChange={formikProps.handleChange}
          />
          <Input
            label="Full Name"
            name="fullName"
            value={formikProps.values.fullName}
            onChange={formikProps.handleChange}
          />

          <Button
            className="mt-6 flex items-center justify-center   max-w-[200px] "
            fullWidth
            size="md"
            disabled={mutationUpdateProfile.isLoading}
            type="submit"
          >
            {mutationUpdateProfile.isLoading ? (
              <Spinner className="h-5 w-5" color="cyan" />
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </div>
      <hr />
    </div>
  );
}
