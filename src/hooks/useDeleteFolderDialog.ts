import { IDefaultApiResponse } from "@services/types";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import apiFile from "@services/http/file/index";
import { IFile } from "@services/http/file/types";
import { AxiosError } from "axios";

interface UseDeleteFolderDialogProps {
  handler: () => void;
}
export function useDeleteFolderDialog({ handler }: UseDeleteFolderDialogProps) {
  const queryClient = useQueryClient();

  const mutationDeleteFolder = useMutation({
    mutationFn: (folderId: string) => {
      return apiFile.deleteFolder({ folderId });
    },
    onSuccess: (response: IDefaultApiResponse) => {
      queryClient.setQueryData<IFile[]>("manageFolders", (currentData) => {
        if (currentData) {
          handler();
          return currentData.filter(
            (item) => item.folderId !== response.data.message.folderId
          );
        }
        return [];
      });
      toast.success("Folder deleted");
    },
    onError: (_: AxiosError) => {
      toast.error("Unexpected error");
    },
  });

  return { mutationDeleteFolder };
}
