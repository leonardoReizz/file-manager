import { ReactNode, createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import apiFile from "@services/http/file/index";
import { IFolder } from "@services/http/file/types";

interface FilesContextType {
  files: IFolder[];
  isLoading: boolean;
}

interface FilesContextProviderProps {
  children: ReactNode;
  // onChangeState: (newState: "index" | "loading") => void;
}

export const FilesContext = createContext({} as FilesContextType);

export function FilesContextProvider({ children }: FilesContextProviderProps) {
  const [files, setFiles] = useState<IFolder[]>([]);

  async function fetchFolders() {
    const response = await apiFile.list();
    if (response.status === 200) {
      return response.data.message;
    }
  }

  const { data, isLoading } = useQuery("manageFolders", fetchFolders, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setFiles(data);
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        // onChangeState("index");
      }, 1000);
    }
  }, [isLoading]);

  return (
    <FilesContext.Provider value={{ files, isLoading }}>
      {children}
    </FilesContext.Provider>
  );
}
