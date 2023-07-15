import { DefaultApiResponse } from "@services/types";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import * as Yup from "yup";
import apiFolder from "@services/http/file/index";
import { Folder } from "@services/http/file/types";
import { useEffect } from "react";

interface UseCreateFolderDialogProps {
  handler: () => void;
  open: boolean;
}

export function useCreateFolderDialog({
  handler,
  open,
}: UseCreateFolderDialogProps) {
  const queryClient = useQueryClient();
  const initialValues = {
    name: "",
  };

  useEffect(() => {
    if (open) formikProps.resetForm();
  }, [open]);

  const mutationCreate = useMutation({
    mutationFn: (values: typeof initialValues) => {
      return apiFolder.createFolder({ name: values.name });
    },
    onSuccess: (response: DefaultApiResponse) => {
      queryClient.setQueryData<Folder[]>("manageFolders", (currentData) => {
        if (currentData) {
          formikProps.resetForm();

          return [
            ...currentData,
            {
              folder: response.data.message.folder,
              pinned: false,
              folderId: response.data.message.folderId,
              folderName: response.data.message.folderName,
              files: [],
            },
          ];
        }
        return [];
      });

      handler();
      toast.success("Folder created");
    },
    onError: () => {
      toast.error("Unexpected error");
    },
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(100, "Name cannot be more than 32 characters")
      .min(5, "Name must be 5 characters")
      .required("Name is a required field"),
  });

  const formikProps = useFormik({
    initialValues,
    onSubmit: (values) => mutationCreate.mutate(values),
    validationSchema,
  });

  return { mutationCreate, formikProps };
}
