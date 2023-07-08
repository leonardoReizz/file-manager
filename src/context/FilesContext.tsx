import { ReactNode, createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import apiFile from "@services/http/file/index";
import { IFile } from "@services/http/file/types";

interface FilesContextType {
  files: IFile[];
  isLoading: boolean;
}

interface FilesContextProviderProps {
  children: ReactNode;
  onChangeState: (newState: "index" | "loading") => void;
}

export const FilesContext = createContext({} as FilesContextType);

export function FilesContextProvider({
  children,
  onChangeState,
}: FilesContextProviderProps) {
  const [files, setFiles] = useState<IFile[]>([]);

  const { data, isLoading } = useQuery(
    ["files"],
    async () => {
      const response = await apiFile.list();
      if (response.status === 200) {
        return response.data.message;
      }
    },
    {
      retry: 1,
    }
  );

  useEffect(() => {
    if (data) {
      setFiles(data);
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        onChangeState("index");
      }, 1000);
    }
  }, [isLoading]);

  return (
    <FilesContext.Provider value={{ files, isLoading }}>
      {children}
    </FilesContext.Provider>
  );
}
