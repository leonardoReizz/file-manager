import {
  AdjustmentsHorizontalIcon,
  CloudArrowUpIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import {
  Button,
  IconButton,
  Input,
  Navbar as MaterialNavbar,
} from "@material-tailwind/react";
import { useRef } from "react";
import { CreateFolderDialog } from "./components/CreateFolderDialog";
import { useNavbar } from "@hooks/useNavbar";
import { UploadFileDialog } from "./components/UploadFileDialog";

export function Navbar() {
  const {
    isOpenCreateFolderDialog,
    isOpenUploadDialog,
    onOpenChangeCreateFolderDialog,
    onOpenChangeUploadDialog,
  } = useNavbar();

  return (
    <>
      <UploadFileDialog
        open={isOpenUploadDialog}
        handler={onOpenChangeUploadDialog}
      />
      <CreateFolderDialog
        open={isOpenCreateFolderDialog}
        handler={onOpenChangeCreateFolderDialog}
      />
      <div className="shadow w-full h-[80px] flex items-center justify-center">
        <MaterialNavbar className="shadow-none mx-auto max-w-screen-2xl h-[80px] px-0">
          <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900 w-full">
            <div className="relative flex w-full gap-2 max-w-[500px]">
              <MagnifyingGlassIcon className="absolute left-2 top-3 w-5 h-5" />
              <Input
                type="search"
                placeholder="Search..."
                className="focus:!border-t-violet-500 focus:!border-violet-500 ring-4 ring-transparent !border !border-blue-gray-50 bg-white shadow-lg shadow-violet-900/5 placeholder:text-blue-gray-200 text-blue-gray-500"
                size="lg"
                labelProps={{ className: "hidden" }}
                containerProps={{
                  className: " w-full ",
                }}
              />
              <IconButton
                variant="text"
                className="!absolute right-1 top-[2px] rounded text-violet-500 active:bg-violet-100 hover:bg-violet-100 focus:bg-transparent"
              >
                <AdjustmentsHorizontalIcon className="w-5 h-5" />
              </IconButton>
            </div>
            <div className="ml-auto flex gap-4">
              <Button
                className="flex items-center justify-center gap-2 bg-blue-500 shadow-blue-100 hover:shadow-blue-300"
                onClick={onOpenChangeCreateFolderDialog}
              >
                <PlusIcon className="h-4 w-4" />
                Create Folder
              </Button>
              <Button
                className="flex items-center justify-center gap-2 bg-violet-500 shadow-violet-100 hover:shadow-violet-300"
                onClick={onOpenChangeUploadDialog}
              >
                <CloudArrowUpIcon className="h-4 w-4" />
                Upload File
              </Button>
            </div>
          </div>
        </MaterialNavbar>
      </div>
    </>
  );
}
