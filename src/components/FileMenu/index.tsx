import { StarIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useFileMenu } from "@hooks/useFileMenu";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { handler } from "@material-tailwind/react/types/components/dialog";
import { File } from "@services/http/file/types";
import { ReactNode } from "react";

interface FileMenuProps {
  file: File;
  folderId: string;
  children: ReactNode;
  open?: boolean;
  handler?: handler;
}

export function FileMenu({
  file,
  folderId,
  children,
  handler,
  open,
}: FileMenuProps) {
  const { mutationFavoriteFile, mutationUnfavoriteFile, handleDeleteFile } =
    useFileMenu();

  return (
    <Menu
      open={open}
      handler={handler}
      placement={open !== undefined ? "right" : undefined}
    >
      <MenuHandler>{children}</MenuHandler>
      <MenuList className="flex flex-col gap-1">
        {!file.favorited && (
          <MenuItem
            className="flex items-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              mutationFavoriteFile.mutate({
                folderId,
                fileId: file.fileId,
              });
            }}
          >
            <StarIcon className="h-4 w-4" />
            Favorite
          </MenuItem>
        )}

        {file.favorited && (
          <MenuItem
            className="flex items-center gap-2"
            onClick={(e) => {
              mutationUnfavoriteFile.mutate({
                folderId,
                fileId: file.fileId,
              });
            }}
          >
            <StarIcon className="h-4 w-4" />
            Unfavorite
          </MenuItem>
        )}
        <hr />
        <MenuItem
          className="flex items-center gap-2 !text-red-500"
          onClick={() => handleDeleteFile(file, folder)}
        >
          <TrashIcon className="h-4 w-4" />
          Delete File
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
