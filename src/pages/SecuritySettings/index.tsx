import { useSecuritySettings } from "@hooks/useSecuritySettings";
import { Button, Input, Spinner, Typography } from "@material-tailwind/react";

export function SecuritySettings() {
  const { formikProps, mutationChangePassword } = useSecuritySettings();

  return (
    <div className="w-full flex-col flex gap-10">
      <div>
        <Typography variant="h5">Security</Typography>
        <Typography variant="small">
          Keep your data and your account safe
        </Typography>
      </div>

      <div className="w-full flex flex-col gap-4">
        <Typography>Change Password</Typography>
        <form
          onSubmit={formikProps.handleSubmit}
          className="w-full max-w-[500px] flex flex-col gap-4"
        >
          <Input
            label="Current password"
            name="currentPassword"
            type="password"
            onChange={formikProps.handleChange}
            error={
              Boolean(formikProps.touched.currentPassword) &&
              Boolean(formikProps.errors.currentPassword)
            }
          />
          <Input
            label="New password"
            name="newPassword"
            type="password"
            onChange={formikProps.handleChange}
            error={
              Boolean(formikProps.touched.newPassword) &&
              Boolean(formikProps.errors.newPassword)
            }
          />
          <Input
            label="Confirm new password"
            name="confirmNewPassword"
            type="password"
            onChange={formikProps.handleChange}
            error={
              Boolean(formikProps.touched.confirmNewPassword) &&
              Boolean(formikProps.errors.confirmNewPassword)
            }
          />

          <Typography variant="small" className="text-red-500 -mt-3">
            {(formikProps.errors.currentPassword &&
              formikProps.touched.currentPassword &&
              formikProps.errors.currentPassword) ||
              (formikProps.errors.newPassword &&
                formikProps.touched.newPassword &&
                formikProps.errors.newPassword) ||
              (formikProps.errors.confirmNewPassword &&
                formikProps.touched.confirmNewPassword &&
                formikProps.errors.confirmNewPassword)}
          </Typography>

          <Button
            className="mt-6 flex items-center justify-center max-w-[200px]"
            fullWidth
            size="md"
            disabled={mutationChangePassword.isLoading}
            type="submit"
          >
            {mutationChangePassword.isLoading ? (
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
