import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useNavbar() {
  const [isOpenCreateFolderDialog, setIsOpenCreateFolderDialog] =
    useState<boolean>(false);
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const onChangeSearchValue = useCallback(
    (value: string) => {
      const searchParams = new URLSearchParams(search);
      searchParams.set("search", value);
      const newSearch = searchParams.toString();
      const newUrl = `${pathname}?${newSearch}`;
      navigate(newUrl);
    },
    [navigate, pathname, search]
  );

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
    onChangeSearchValue,
  };
}
