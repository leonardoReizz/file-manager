import { TrashIcon } from "@heroicons/react/20/solid";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { File } from "@services/http/file/types";

interface ViewFileDialogProps {
  handler: () => void;
  open: boolean;
  file: File;
}

export function ViewFileDialog({ handler, open, file }: ViewFileDialogProps) {
  return (
    <Dialog
      open={open}
      handler={handler}
      className="!max-w-[200px] !min-w-[500px] "
      size="md"
    >
      <DialogHeader className="flex  items-start relative gap-4">
        <hr className="mr-1 border-red-500 border-t-[6px] absolute w-full top-[0px] rounded-t-md left-0 " />
        <div className="absolute w-full flex justify-center items-center left-0">
          <div className="bg-red-500 rounded-full h-20 min-w-[5rem] p-4 mt-2  text-white absolute -top-16 ">
            <TrashIcon />
          </div>
        </div>
        <div className="pt-8 flex flex-col items-center gap-4 w-full">
          <Typography variant="h4">Delete Folder</Typography>
          <Typography small="small">
            Are you sure you want to delete:{" "}
            <strong className="font-bold uppercase text-red-500">
              {file?.fileName}, all files in this folder will also be removed
            </strong>
          </Typography>
        </div>
      </DialogHeader>
      <DialogBody className="w-full flex items-center justify-center">
        OLA BODYU
      </DialogBody>
    </Dialog>
  );
}
