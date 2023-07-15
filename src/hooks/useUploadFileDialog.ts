import { useMutation, useQueryClient } from "react-query";
import apiFile from "@services/http/file/index";
import { DefaultApiResponse } from "@services/types";
import { toast } from "react-toastify";
import { useState } from "react";
import { useFilesContext } from "./context/useFilesContext";
import { Folder } from "@services/http/file/types";

interface UseUploadFileDialogProps {
  handler: () => void;
  open: boolean;
}

export function useUploadFileDialog({
  handler,
  open,
}: UseUploadFileDialogProps) {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>("Root");
  const queryClient = useQueryClient();

  const { files } = useFilesContext();
  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFolderChange = (folder: string) => {
    setSelectedFolder(folder);
  };

  const mutationUpload = useMutation({
    mutationFn: () => {
      const formData = new FormData();
      formData.append("file", selectedFile as File);
      return apiFile.upload({ file: formData, folderId: selectedFolder });
    },
    onSuccess: (response: DefaultApiResponse) => {
      queryClient.setQueryData<Folder[]>("manageFolders", (currentData) => {
        if (currentData) {
          const findIndex = currentData.findIndex(
            (folder) => folder.folderId === response.data.message.folderId
          );

          if (findIndex >= 0) {
            console.log(findIndex);
            let folders = [...currentData];

            folders[findIndex] = {
              ...folders[findIndex],
              files: [
                ...folders[findIndex].files,
                response.data.message.file,
              ].sort((x, y) => {
                const a = x.fileName.toLowerCase();
                const b = y.fileName.toLowerCase();
                return a === b ? 0 : a > b ? 1 : -1;
              }),
            };

            console.log(folders);

            return folders;
          }
          return currentData;
        }
        return [];
      });
      handler();

      toast.success("Saved file");
    },
    onError: () => {
      toast.error("Unexpected error");
    },
  });

  const folders = files.map((folder) => {
    return folder;
  });

  return {
    mutationUpload,
    handleFileChange,
    handleFolderChange,
    folders,
  };
}
