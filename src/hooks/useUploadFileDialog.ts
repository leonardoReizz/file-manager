import { useMutation } from "react-query";
import apiFile from "@services/http/file/index";
import { IDefaultApiResponse } from "@services/types";
import { toast } from "react-toastify";
import { useState } from "react";
import { useFilesContext } from "./context/useFilesContext";

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
    onSuccess: (response: IDefaultApiResponse) => {
      console.log(response);
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
