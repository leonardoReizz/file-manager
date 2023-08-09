import { useCallback, useEffect, useRef, useState } from "react";
import { useFilesContext } from "./context/useFilesContext";
import { File, Folder } from "@services/http/file/types";

import apiFile from "@services/http/file/index";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import { DefaultApiResponse } from "@services/types";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useViewFileDialogContext } from "./useViewFileDialogContext";

export function useHome() {
  const [isOpenDeleteFolderDialog, setIsOpenDeleteFolderDialog] =
    useState<boolean>(false);
  const [isOpenDeleteFileDialog, setIsOpenDeleteFileDialog] =
    useState<boolean>(false);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean[]>([]);

  const [listFileType, setListFileType] = useState<"grid" | "list">(
    (Cookies.get("viewFileType") as "grid" | "list") || "list"
  );
  const toggleListFileType = useCallback((value: "grid" | "list") => {
    setListFileType(value);
    Cookies.set("viewFileType", value);
  }, []);

  const [selectedFolder, setSelectedFolder] = useState<Folder | undefined>();
  const [selectedFile, setSelectedFile] = useState<File | undefined>();

  const {
    isOpen: isOpenViewFileDialog,
    onOpenChange: onOpenChangeViewFileDialog,
  } = useViewFileDialogContext();

  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>();
  const filesContext = useFilesContext();
  const queryClient = useQueryClient();
  const { search } = useLocation();

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target !== gridRef.current) {
        setIsOpenMenu((state) =>
          state.map(() => {
            return false;
          })
        );
      }
    });

    return () => {
      window.removeEventListener("click", () => {});
    };
  }, []);

  const handleDeleteFolder = useCallback((folder: Folder) => {
    setSelectedFolder(folder);
    setIsOpenDeleteFolderDialog(true);
  }, []);

  const onOpenChangeDeleteFolderDialog = useCallback(() => {
    setIsOpenDeleteFolderDialog((state) => !state);
  }, []);

  const onOpenChangeDeleteFileDialog = useCallback(() => {
    setIsOpenDeleteFileDialog((state) => !state);
  }, []);

  const onOpenChangeMenu = useCallback(
    (open: boolean, index: number) => {
      let menuOpen = isOpenMenu.map(() => false);
      menuOpen[index] = open;
      setIsOpenMenu(menuOpen);
    },
    [isOpenMenu]
  );

  const handleOpenViewFileDialog = useCallback(
    (file: File | undefined, open: boolean) => {
      onOpenChangeViewFileDialog(open);
      setSelectedFile(file);
    },
    [onOpenChangeViewFileDialog]
  );

  const mutationPinFolder = useMutation({
    mutationFn: (folderId: string) => {
      return apiFile.pinFolder({ folderId });
    },
    onSuccess: (response: DefaultApiResponse) => {
      queryClient.setQueryData<Folder[]>("manageFolders", (currentData) => {
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
    onSuccess: (response: DefaultApiResponse) => {
      queryClient.setQueryData<Folder[]>("manageFolders", (currentData) => {
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

  const searchParams = new URLSearchParams(search);
  const decodedSearch: string =
    decodeURIComponent(searchParams.get("search") || "") || "";

  const files = filesContext.files.filter(
    (folder) =>
      folder.folderName.toLowerCase().includes(decodedSearch.toLowerCase()) ||
      folder.files.some((file) =>
        file.extension.toLowerCase().includes(decodedSearch.toLowerCase())
      )
  );

  const TABLE_HEAD = ["Name", "Path", "CreatedAt", ""];

  const TABLE_ROWS = files.flatMap((folder) => {
    return folder.files.map((file) => {
      return {
        ...file,
        path: `/${folder.folderName}`,
        folderId: folder.folderId,
        folder,
      };
    });
  });

  return {
    ...filesContext,
    files,
    handleDeleteFolder,
    onOpenChangeDeleteFolderDialog,
    isOpenDeleteFolderDialog,
    selectedFolder,
    mutationPinFolder,
    mutationUnpinFolder,
    searchValue: decodedSearch,
    isOpenDeleteFileDialog,
    selectedFile,
    onOpenChangeDeleteFileDialog,
    TABLE_HEAD,
    TABLE_ROWS,
    listFileType,
    toggleListFileType,
    isOpenMenu,
    onOpenChangeMenu,
    navigate,
    isOpenViewFileDialog,
    onOpenChangeViewFileDialog,
    gridRef,
    handleOpenViewFileDialog,
  };
}
