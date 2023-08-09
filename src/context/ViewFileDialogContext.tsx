import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

interface ViewFileDialogContextType {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ViewFileDialogContextContextProviderProps {
  children: ReactNode;
}

export const ViewFileDialogContext = createContext(
  {} as ViewFileDialogContextType
);

export function ViewFileDialogContextProvider({
  children,
}: ViewFileDialogContextContextProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  return (
    <ViewFileDialogContext.Provider value={{ isOpen, onOpenChange }}>
      {children}
    </ViewFileDialogContext.Provider>
  );
}
