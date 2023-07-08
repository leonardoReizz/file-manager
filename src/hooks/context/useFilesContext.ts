import { useContext } from "react";
import { FilesContext } from "../../context/FilesContext";

export function useFilesContext() {
  const filesContext = useContext(FilesContext);
  return { ...filesContext };
}
