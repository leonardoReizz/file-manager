import { useCallback, useState } from "react";
import { useFilesContext } from "./context/useFilesContext";
import { IFile } from "@services/http/file/types";

import apiFile from "@services/http/file/index";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import { IDefaultApiResponse } from "@services/types";
import { AxiosError } from "axios";

interface FavoriteFile {
  folderId: string;
  fileId: string;
}

export function useHome() {
  const [isOpenDeleteFolderDialog, setIsOpenDeleteFolderDialog] =
    useState<boolean>(false);

  const [selectedFolder, setSelectedFolder] = useState<IFile | undefined>();
  const filesContext = useFilesContext();
  const queryClient = useQueryClient();
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
      queryClient.setQueryData<IFile[]>("manageFolders", (currentData) => {
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
      queryClient.setQueryData<IFile[]>("manageFolders", (currentData) => {
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
    mutationFn: ({ fileId, folderId }: FavoriteFile) => {
      return apiFile.favoriteFile({ fileId, folderId });
    },
    onSuccess: (response: IDefaultApiResponse) => {
      queryClient.setQueryData<IFile[]>("manageFolders", (currentData) => {
        if (currentData) {
          const findIndexFolder = currentData.findIndex(
            (folder) => folder.folderId === response.data.message.folderId
          );

          if (findIndexFolder >= 0) {
            const findIndexFile = currentData[findIndexFolder].files.findIndex(
              (file) => file.fileId === response.data.message.fileId
            );

            if (findIndexFile >= 0) {
              currentData[findIndexFolder].files[findIndexFile].favorited =
                true;

              return currentData;
            }

            return currentData;
          }
        }

        return [];
      });
      toast.success("Favorited file");
    },
    onError: (_: AxiosError) => {
      toast.error("Unexpected error");
    },
  });

  const mutationUnfavoriteFile = useMutation({
    mutationFn: ({ fileId, folderId }: FavoriteFile) => {
      return apiFile.unfavoriteFile({ fileId, folderId });
    },
    onSuccess: (response: IDefaultApiResponse) => {
      queryClient.setQueryData<IFile[]>("manageFolders", (currentData) => {
        if (currentData) {
          const findIndexFolder = currentData.findIndex(
            (folder) => folder.folderId === response.data.message.folderId
          );

          if (findIndexFolder >= 0) {
            const findIndexFile = currentData[findIndexFolder].files.findIndex(
              (file) => file.fileId === response.data.message.fileId
            );

            if (findIndexFile >= 0) {
              currentData[findIndexFolder].files[findIndexFile].favorited =
                false;

              return currentData;
            }

            return currentData;
          }
        }

        return [];
      });
      toast.success("Favorited file");
    },
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
