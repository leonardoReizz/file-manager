import { FolderIcon } from "@heroicons/react/20/solid";
import { useUploadFileDialog } from "@hooks/useUploadFileDialog";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Select,
  Typography,
  Option,
  Spinner,
} from "@material-tailwind/react";

interface UploadFileDialogProps {
  handler: () => void;
  open: boolean;
}

export function UploadFileDialog({ handler, open }: UploadFileDialogProps) {
  const { mutationUpload, handleFileChange, handleFolderChange, folders } =
    useUploadFileDialog({
      handler,
      open,
    });

  console.log(folders);

  return (
    <Dialog
      open={open}
      handler={handler}
      className="!max-w-[200px] !min-w-[500px] "
      size="md"
    >
      <DialogHeader className="flex items-start relative gap-2">
        <hr className="mr-1 border-violet-500 border-t-[6px] absolute w-full top-[0px] rounded-t-md left-0 " />
        <div className="absolute w-full flex justify-center items-center left-0">
          <div className="bg-violet-500 rounded-full h-20 min-w-[5rem] p-4 mt-2  text-white absolute -top-16 ">
            <FolderIcon />
          </div>
        </div>
        <div className="pt-8 flex flex-col items-center w-full">
          <Typography variant="h4">Upload File</Typography>
          <Typography variant="small">
            Create folders, organize files and share with people
          </Typography>
        </div>
      </DialogHeader>
      <DialogBody className="w-full flex items-center justify-center h-full">
        <div className="flex flex-col gap-2  justify-center items-center w-full">
          <Select
            label="Select Folder"
            value="Root"
            onChange={(e) => e && handleFolderChange(e)}
          >
            {folders.map((folder) => {
              return (
                <Option key={folder.folderId} value={folder.folderId}>
                  {folder.folderName}
                </Option>
              );
            })}
          </Select>
          <input
            type="file"
            onChange={handleFileChange}
            placeholder="Select file"
            className=""
          />

          <div className="flex flex-col gap-2 max-w-[300px] justify-center items-center w-full">
            <Button
              className="mt-6 flex items-center justify-center bg-violet-500 shadow-violet-300 hover:shadow-violet-400 "
              fullWidth
              size="md"
              disabled={mutationUpload.isLoading}
              type="submit"
              onClick={() => mutationUpload.mutate()}
            >
              {mutationUpload.isLoading ? (
                <Spinner className="h-5 w-5" color="cyan" />
              ) : (
                "Save"
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
        </div>
      </DialogBody>
    </Dialog>
  );
}
