import {
  EllipsisHorizontalIcon,
  FolderIcon,
  MapPinIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import {
  Card,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";

interface FolderCardProps {
  title: string;
  handleDelete: () => void;
  handlePinFolder?: () => void;
  handleUnpinFolder?: () => void;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}

export function FolderCard({
  title,
  handleDelete,
  onClick,
  handlePinFolder,
  handleUnpinFolder,
}: FolderCardProps) {
  return (
    <Card
      onClick={onClick}
      className="rounded-lg border flex-[1_1_300px]  h-[80px] w-full p-4 flex flex-row items-center justify-between hover:bg-blue-50 cursor-pointer transition"
    >
      <div className="flex items-center justify-start gap-4 w-full ">
        <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
          <FolderIcon className="h-5 w-5 text-blue-400" />
        </div>
        <Typography variant="paragraph">{title}</Typography>
      </div>
      <div className="flex">
        <Menu>
          <MenuHandler>
            <IconButton
              variant="text"
              className="rounded-full hover:bg-blue-100 h-8 w-8"
            >
              <EllipsisHorizontalIcon className="h-5 w-5" />
            </IconButton>
          </MenuHandler>
          <MenuList className="flex flex-col gap-1">
            {handleUnpinFolder && (
              <MenuItem
                className="flex items-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnpinFolder();
                }}
              >
                <MapPinIcon className="h-4 w-4" />
                Unpin Folder
              </MenuItem>
            )}

            {handlePinFolder && (
              <MenuItem
                className="flex items-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePinFolder();
                }}
              >
                <MapPinIcon className="h-4 w-4" />
                Pin Folder
              </MenuItem>
            )}
            <MenuItem className="flex items-center gap-2">
              <ShareIcon className="h-4 w-4" />
              Share
            </MenuItem>
            <hr className="mr-1" />
            <MenuItem
              className="flex items-center gap-2 !text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              <TrashIcon className="h-4 w-4 mb-1" />
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Card>
  );
}
