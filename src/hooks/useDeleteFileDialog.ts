import { DefaultApiResponse } from "@services/types";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import apiFile from "@services/http/file/index";
import { Folder } from "@services/http/file/types";
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
    onSuccess: (response: DefaultApiResponse) => {
      queryClient.setQueryData<Folder[]>("manageFolders", (currentData) => {
        if (currentData) {
          let currentFolders = [...currentData];
          const findIndex = currentData.findIndex(
            (folder) => folder.folderId === response.data.message.folderId
          );

          if (findIndex >= 0) {
            currentFolders[findIndex] = {
              ...currentFolders[findIndex],
              files: currentFolders[findIndex].files.filter(
                (file) => file.fileId !== response.data.message.fileId
              ),
            };
          }

          return currentFolders;
        }
        return [];
      });
      handler();
      toast.success("File deleted");
    },
    onError: (_: AxiosError) => {
      toast.error("Unexpected error");
    },
  });

  return { mutationDeleteFile };
}
