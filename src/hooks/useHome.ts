import { useCallback, useState } from "react";
import { useFilesContext } from "./context/useFilesContext";
import { IFile } from "@services/http/file/types";

import apiFile from "@services/http/file/index";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import { IDefaultApiResponse } from "@services/types";
import { AxiosError } from "axios";

export function useHome() {
  const [isOpenDeleteFolderDialog, setIsOpenDeleteFolderDialog] =
    useState<boolean>(false);
  const [selectedFolder, setSelectedFolder] = useState<IFile | undefined>();
  const filesContext = useFilesContext();
  const queryData = useQueryClient();
  const handleDeleteFolder = useCallback((folder: IFile) => {
    setSelectedFolder(folder);
    setIsOpenDeleteFolderDialog(true);
  }, []);

  const onOpenChangeDeleteFolderDialog = useCallback(() => {
    setIsOpenDeleteFolderDialog((state) => !state);
  }, []);

  const mutationPinFolder = useMutation({
    mutationFn: (folderId: string) => {
      return apiFile.pinFolder({ folderId });
    },
    onSuccess: (response: IDefaultApiResponse) => {
      queryData.setQueryData<IFile[]>(["files"], (currentData) => {
        if (currentData) {
          const findIndex = currentData.findIndex(
            (folder) => folder.folderId === response.data.message.folderId
          );

          if (findIndex > 0) {
            currentData[findIndex] = {
              ...currentData[findIndex],
              pinned: true,
            };
            return currentData;
          }
        }

        return [];
      });
    },
    onError: () => {
      toast.error("Unexpected error");
    },
  });

  const mutationUnpinFolder = useMutation({
    mutationFn: (folderId: string) => {
      return apiFile.unpinFolder({ folderId });
    },
    onSuccess: (response: IDefaultApiResponse) => {
      queryData.setQueryData<IFile[]>(["files"], (currentData) => {
        if (currentData) {
          const findIndex = currentData.findIndex(
            (folder) => folder.folderId === response.data.message.folderId
          );

          if (findIndex > 0) {
            currentData[findIndex] = {
              ...currentData[findIndex],
              pinned: false,
            };

            console.log(currentData);
            return currentData;
          }
        }

        return [];
      });
    },
    onError: () => {
      toast.error("Unexpected error");
    },
  });

  const mutationFavoriteFile = useMutation({
    mutationFn: (fileId: string) => {
      return apiFile.favoriteFile({ fileId });
    },
    onSuccess: (response: IDefaultApiResponse) => {},
    onError: (_: AxiosError) => {
      toast.error("Unexpected error");
    },
  });

  const mutationUnfavoriteFile = useMutation({
    mutationFn: (fileId: string) => {
      return apiFile.favoriteFile({ fileId });
    },
    onSuccess: (response: IDefaultApiResponse) => {},
    onError: (_: AxiosError) => {
      toast.error("Unexpected error");
    },
  });

  return {
    ...filesContext,
    handleDeleteFolder,
    onOpenChangeDeleteFolderDialog,
    isOpenDeleteFolderDialog,
    selectedFolder,
    mutationPinFolder,
    mutationUnpinFolder,
    mutationUnfavoriteFile,
    mutationFavoriteFile,
  };
}
