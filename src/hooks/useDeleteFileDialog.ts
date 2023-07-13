import { IDefaultApiResponse } from "@services/types";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import apiFile from "@services/http/file/index";
import { IFolder } from "@services/http/file/types";
import { AxiosError } from "axios";

interface UseDeleteFileDialogProps {
  handler: () => void;
}

interface MutationDeleteFileData {
  fileId: string;
  folderId: string;
}

export function useDeleteFileDialog({ handler }: UseDeleteFileDialogProps) {
  const queryClient = useQueryClient();

  const mutationDeleteFile = useMutation({
    mutationFn: ({ fileId, folderId }: MutationDeleteFileData) => {
      return apiFile.deleteFile({ fileId, folderId });
    },
    onSuccess: (response: IDefaultApiResponse) => {
      queryClient.setQueryData<IFolder[]>("manageFolders", (currentData) => {
        if (currentData) {
          handler();

          let currentFolders = [...currentData];
          const findIndex = currentData.findIndex(
            (folder) => folder.folderId === response.data.message.folderId
          );

          if (findIndex >= 0) {
            currentFolders[findIndex].files.filter(
              (file) => file.fileId !== response.data.message.fileId
            );
          }

          return currentFolders;
        }
        return [];
      });
      toast.success("File deleted");
    },
    onError: (_: AxiosError) => {
      toast.error("Unexpected error");
    },
  });

  return { mutationDeleteFile };
}
