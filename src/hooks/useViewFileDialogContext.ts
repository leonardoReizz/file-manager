import { useContext } from "react";
import { ViewFileDialogContext } from "../context/ViewFileDialogContext";

export function useViewFileDialogContext() {
  const viewFileDialogContext = useContext(ViewFileDialogContext);
  return { ...viewFileDialogContext };
}
