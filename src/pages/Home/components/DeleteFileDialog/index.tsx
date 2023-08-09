import { TrashIcon } from "@heroicons/react/20/solid";
import { useDeleteFileDialog } from "@hooks/useDeleteFileDialog";
import { useDeleteFolderDialog } from "@hooks/useDeleteFolderDialog";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { File, Folder } from "@services/http/file/types";

interface DeleteFileDialogProps {
  handler: () => void;
  open: boolean;
  file: File;
  folder: Folder;
}

export function DeleteFileDialog({
  handler,
  open,
  file,
  folder,
}: DeleteFileDialogProps) {
  const { mutationDeleteFile } = useDeleteFileDialog({ handler });
  return (
    <Dialog
      open={open}
      handler={handler}
      className="!max-w-[200px] !min-w-[500px] "
      size="md"
    >
      <DialogHeader className="flex items-start relative gap-4">
        <hr className="mr-1 border-red-500 border-t-[6px] absolute w-full top-[0px] rounded-t-md left-0 " />
        <div className="absolute w-full flex justify-center items-center left-0">
          <div className="bg-red-500 rounded-full h-20 min-w-[5rem] p-4 mt-2  text-white absolute -top-16 ">
            <TrashIcon />
          </div>
        </div>
        <div className="pt-8 flex flex-col justify-center items-center gap-4 w-full">
          <Typography variant="h4">Delete File</Typography>
          <Typography small="small">
            Are you sure you want to delete:{" "}
            <strong className="font-bold uppercase text-red-500">
              {file?.fileName}
            </strong>
          </Typography>
        </div>
      </DialogHeader>
      <DialogBody className="w-full flex items-center justify-center">
        <div className="flex flex-col gap-2 max-w-[300px] justify-center items-center w-full">
          <Button
            className="mt-6 flex items-center justify-center "
            fullWidth
            color="red"
            size="md"
            disabled={mutationDeleteFile.isLoading}
            type="submit"
            onClick={() =>
              mutationDeleteFile.mutate({
                fileId: file.fileId,
                folderId: folder.folderId,
              })
            }
          >
            {mutationDeleteFile.isLoading ? (
              <Spinner className="h-5 w-5" color="cyan" />
            ) : (
              "Delete"
            )}
          </Button>
          <Button
            variant="text"
            color="blue"
            onClick={handler}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
}
