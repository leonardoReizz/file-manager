import { useCallback, useState } from "react";

export function useNavbar() {
  const [isOpenCreateFolderDialog, setIsOpenCreateFolderDialog] =
    useState<boolean>(false);

  const [isOpenUploadDialog, setIsOpenUploadDialog] = useState<boolean>(false);

  const onOpenChangeCreateFolderDialog = useCallback(() => {
    setIsOpenCreateFolderDialog((state) => !state);
  }, []);

  const onOpenChangeUploadDialog = useCallback(() => {
    setIsOpenUploadDialog((state) => !state);
  }, []);

  const handleFileChange = async (event: any) => {
    const selectedFile = event.target.files[0];

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
    } catch (error) {
      console.error("Erro ao enviar o arquivo:", error);
    }
  };

  return {
    onOpenChangeCreateFolderDialog,
    onOpenChangeUploadDialog,
    isOpenCreateFolderDialog,
    isOpenUploadDialog,
  };
}
