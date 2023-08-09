import { FileIcon } from "@components/FileIcon";
import {
  EllipsisVerticalIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useHome } from "@hooks/useHome";
import {
  Card,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { DeleteFileDialog } from "@pages/Home/components/DeleteFileDialog";

export function Favorite() {
  const {
    mutationFavoriteFile,
    mutationUnfavoriteFile,
    TABLE_HEAD,
    TABLE_ROWS,
    handleDeleteFile,
    selectedFile,
    selectedFolder,
    isOpenDeleteFileDialog,
    onOpenChangeDeleteFileDialog,
  } = useHome();

  return (
    <>
      {selectedFile && selectedFolder && (
        <DeleteFileDialog
          handler={onOpenChangeDeleteFileDialog}
          open={isOpenDeleteFileDialog}
          file={selectedFile}
          folder={selectedFolder}
        />
      )}
      <div className="flex flex-col w-full h-full">
        <section>
          <Card className="my-4  w-full shadow-none">
            <CardBody className=" p-0">
              <Card className="h-full w-full">
                <table className="w-full min-w-max table-auto text-left p-0">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="  border-blue-gray-100 bg-transparent p-4"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_ROWS.filter((file) => file.favorited).map(
                      (
                        {
                          fileName,
                          fileId,
                          path,
                          file,
                          extension,
                          folderId,
                          favorited,
                          folder,
                        },
                        index
                      ) => {
                        const isLast = index === TABLE_ROWS.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b  rounded-full border-blue-gray-50";

                        return (
                          <tr key={fileId} className="border">
                            <td className={classes}>
                              <div className="flex items-center gap-2">
                                {favorited && (
                                  <StarIcon className="h-4 w-4 text-amber-400" />
                                )}
                                <FileIcon extension={extension} />
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal flex items-center gap-2 "
                                >
                                  {fileName}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {path === "/Root" ? "/" : path}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                "
                              </Typography>
                            </td>
                            <td className={classes}>
                              <div className="flex items-center gap-4">
                                <Menu>
                                  <MenuHandler>
                                    <IconButton
                                      variant="text"
                                      className="rounded-full hover:bg-blue-100 h-8 w-8"
                                    >
                                      <EllipsisVerticalIcon className="h-5 w-5" />
                                    </IconButton>
                                  </MenuHandler>
                                  <MenuList className="flex flex-col gap-1">
                                    {!favorited && (
                                      <MenuItem
                                        className="flex items-center gap-2"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          mutationFavoriteFile.mutate({
                                            folderId,
                                            fileId,
                                          });
                                        }}
                                      >
                                        <StarIcon className="h-4 w-4" />
                                        Favorite
                                      </MenuItem>
                                    )}

                                    {favorited && (
                                      <MenuItem
                                        className="flex items-center gap-2"
                                        onClick={(e) => {
                                          mutationUnfavoriteFile.mutate({
                                            folderId,
                                            fileId,
                                          });
                                        }}
                                      >
                                        <StarIcon className="h-4 w-4" />
                                        Unfavorite
                                      </MenuItem>
                                    )}
                                    <hr className="mr-1" />
                                    <MenuItem
                                      className="flex items-center gap-2 !text-red-500"
                                      onClick={() =>
                                        handleDeleteFile(
                                          {
                                            extension,
                                            favorited,
                                            file,
                                            fileId,
                                            fileName,
                                          },
                                          folder
                                        )
                                      }
                                    >
                                      <TrashIcon className="h-4 w-4" />
                                      Delete File
                                    </MenuItem>
                                  </MenuList>
                                </Menu>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </Card>
            </CardBody>
          </Card>
        </section>
      </div>
    </>
  );
}
