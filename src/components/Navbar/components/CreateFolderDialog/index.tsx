import { FolderIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useCreateFolderDialog } from "@hooks/useCreateFolderDialog";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";

interface CreateFolderDialogProps {
  handler: () => void;
  open: boolean;
}

export function CreateFolderDialog({ handler, open }: CreateFolderDialogProps) {
  const { formikProps, mutationCreate } = useCreateFolderDialog({
    handler,
    open,
  });
  return (
    <Dialog
      open={open}
      handler={handler}
      className="!max-w-[200px] !min-w-[500px] "
      size="md"
    >
      <DialogHeader className="flex items-start relative gap-2">
        <hr className="mr-1 border-blue-500 border-t-[6px] absolute w-full top-[0px] rounded-t-md left-0 " />
        <div className="absolute w-full flex justify-center items-center left-0">
          <div className="bg-blue-500 rounded-full h-20 min-w-[5rem] p-4 mt-2  text-white absolute -top-16 ">
            <FolderIcon />
          </div>
        </div>
        <div className="pt-8 flex flex-col items-center w-full">
          <Typography variant="h4">Create Folder</Typography>
          <Typography variant="small">
            Create folders, organize files and share with people
          </Typography>
        </div>
      </DialogHeader>
      <DialogBody className="w-full flex items-center justify-center h-full">
        <div className="flex flex-col gap-2  justify-center items-center w-full">
          <form
            onSubmit={formikProps.handleSubmit}
            className="w-full h-full flex flex-col items-center justify-center gap-4"
          >
            <Input
              size="lg"
              name="name"
              label="Name"
              onBlur={formikProps.handleBlur}
              onChange={formikProps.handleChange}
              error={
                Boolean(formikProps.touched.name) &&
                Boolean(formikProps.errors.name)
              }
            />
            <Typography
              variant="small"
              className="text-red-500 -mt-3 mr-auto top-0 h-0"
            >
              {(formikProps.errors.name &&
                formikProps.touched.name &&
                formikProps.errors.name) ||
                ""}
            </Typography>
            <div className="flex flex-col gap-2 max-w-[300px] justify-center items-center w-full">
              <Button
                className="mt-6 flex items-center justify-center "
                fullWidth
                size="md"
                disabled={mutationCreate.isLoading}
                type="submit"
              >
                {mutationCreate.isLoading ? (
                  <Spinner className="h-5 w-5" color="cyan" />
                ) : (
                  "Create"
                )}
              </Button>
              <Button
                variant="text"
                color="red"
                onClick={handler}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
            </div>
          </form>
        </div>
      </DialogBody>
    </Dialog>
  );
}
