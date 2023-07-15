import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import apiFile from "@services/http/file/index";
import { DefaultApiResponse } from "@services/types";
import { Folder } from "@services/http/file/types";
import { useCallback, useState } from "react";

interface FavoriteFile {
  folderId: string;
  fileId: string;
}

export function useFileMenu() {
  const [selectedFolder, setSelectedFolder] = useState<Folder | undefined>();
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [isOpenDeleteFileDialog, setIsOpenDeleteFileDialog] =
    useState<boolean>(false);
  const queryClient = useQueryClient();

  const mutationFavoriteFile = useMutation({
    mutationFn: ({ fileId, folderId }: FavoriteFile) => {
      return apiFile.favoriteFile({ fileId, folderId });
    },
    onSuccess: (response: DefaultApiResponse) => {
      queryClient.setQueryData<Folder[]>("manageFolders", (currentData) => {
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
      // toast.success("Favorited file");
    },
    onError: (_: AxiosError) => {
      toast.error("Unexpected error");
    },
  });

  const mutationUnfavoriteFile = useMutation({
    mutationFn: ({ fileId, folderId }: FavoriteFile) => {
      return apiFile.unfavoriteFile({ fileId, folderId });
    },
    onSuccess: (response: DefaultApiResponse) => {
      queryClient.setQueryData<Folder[]>("manageFolders", (currentData) => {
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
      // toast.success("Favorited file");
    },
    onError: (_: AxiosError) => {
      toast.error("Unexpected error");
    },
  });

  const handleDeleteFile = useCallback((file: File, folder: Folder) => {
    setSelectedFile(file);
    setSelectedFolder(folder);
    setIsOpenDeleteFileDialog(true);
  }, []);

  return { mutationFavoriteFile, mutationUnfavoriteFile, handleDeleteFile };
}
