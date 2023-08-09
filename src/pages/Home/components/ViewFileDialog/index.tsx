import {
  FaceSmileIcon,
  FolderIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useViewFileDialogContext } from "@hooks/useViewFileDialogContext";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  Typography,
  Button,
} from "@material-tailwind/react";
import { File } from "@services/http/file/types";

interface ViewFileDialogProps {
  file: File;
}

export function ViewFileDialog({ file }: ViewFileDialogProps) {
  const { isOpen, onOpenChange } = useViewFileDialogContext();
  return (
    <Dialog open={isOpen} handler={onOpenChange} className="" size="xs">
      <DialogHeader className="flex  items-start relative gap-4">
        <hr className="mr-1 border-violet-500 border-t-[6px] absolute w-full top-[0px] rounded-t-md left-0 " />
        <div className="absolute w-full flex justify-center items-center left-0">
          <div className="bg-violet-500 rounded-full h-20 min-w-[5rem] p-4 mt-2  text-white absolute -top-16 ">
            <FolderIcon />
          </div>
        </div>
        <div className="pt-8 flex flex-col items-center gap-4 w-full">
          <Typography variant="h4">{file.fileName}</Typography>
          {/* <Typography small="small">
            Are you sure you want to delete:{" "}
            <strong className="font-bold uppercase text-red-500">
              {file?.fileName}, all files in this folder will also be removed
            </strong>
          </Typography> */}
        </div>
      </DialogHeader>
      <DialogBody className="w-full flex items-center justify-center">
        <Button
          type="button"
          className="flex  min-w-[170px] items-center justify-center gap-2 bg-violet-500 shadow-violet-100 hover:shadow-violet-300 "
        >
          Download File
        </Button>
      </DialogBody>
    </Dialog>
  );
}
