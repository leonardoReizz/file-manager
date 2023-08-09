import {
  EllipsisVerticalIcon,
  ListBulletIcon,
  Squares2X2Icon,
  StarIcon,
} from "@heroicons/react/20/solid";

import {
  Button,
  Card,
  CardBody,
  IconButton,
  Tab,
  Tabs,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";

import { Fragment } from "react";
import { FolderCard } from "../../components/FolderCard";
import { useHome } from "@hooks/useHome";
import { DeleteFolderDialog } from "./components/DeleteFolderDialog";

import { DeleteFileDialog } from "./components/DeleteFileDialog";
import { FileIcon } from "@components/FileIcon";
import { FileMenu } from "@components/FileMenu";
import { ViewFileDialog } from "./components/ViewFileDialog";

export function Home() {
  const {
    files,
    handleDeleteFolder,
    onOpenChangeDeleteFolderDialog,
    isOpenDeleteFolderDialog,
    selectedFolder,
    mutationPinFolder,
    mutationUnpinFolder,
    isOpenDeleteFileDialog,
    selectedFile,
    onOpenChangeDeleteFileDialog,
    TABLE_ROWS,
    TABLE_HEAD,
    navigate,
    listFileType,
    toggleListFileType,
    handleOpenViewFileDialog,
    isOpenMenu,
    onOpenChangeMenu,
    gridRef,
  } = useHome();

  return (
    <>
      {selectedFile && <ViewFileDialog file={selectedFile} />}
      {selectedFolder && (
        <DeleteFolderDialog
          handler={onOpenChangeDeleteFolderDialog}
          open={isOpenDeleteFolderDialog}
          folder={selectedFolder}
        />
      )}
      {selectedFile && selectedFolder && (
        <DeleteFileDialog
          handler={onOpenChangeDeleteFileDialog}
          open={isOpenDeleteFileDialog}
          file={selectedFile}
          folder={selectedFolder}
        />
      )}
      <div className="w-full">
        <section>
          <Typography variant="h4">Pinned Folders</Typography>

          <Card className="my-4  w-full shadow-none">
            <CardBody className="grid grid-cols-4 gap-4 w-full p-0">
              {files
                .filter((folder) => folder.pinned)
                .map((item) => {
                  if (item.folder !== "Root") {
                    return (
                      <FolderCard
                        handleUnpinFolder={() =>
                          mutationUnpinFolder.mutate(item.folderId)
                        }
                        key={item.folderId}
                        title={item.folderName}
                        onClick={() => navigate(`/folder/${item.folderId}`)}
                        handleDelete={() => handleDeleteFolder(item)}
                      />
                    );
                  }
                  return <Fragment key="root"></Fragment>;
                })}
            </CardBody>
          </Card>
        </section>
        <section>
          <Typography variant="h4">Folders</Typography>
          <Card className="my-4  w-full shadow-none">
            <CardBody className="flex flex-wrap gap-4 p-0">
              {files
                .filter((folder) => !folder.pinned)
                .map((item) => {
                  if (item.folder !== "Root") {
                    return (
                      <FolderCard
                        handlePinFolder={() =>
                          mutationPinFolder.mutate(item.folderId)
                        }
                        key={item.folderId}
                        title={item.folderName}
                        onClick={() => navigate(`/folder/${item.folderId}`)}
                        handleDelete={() => handleDeleteFolder(item)}
                      />
                    );
                  }
                  return <Fragment key="root"></Fragment>;
                })}
            </CardBody>
          </Card>
        </section>
        <section>
          <div className="w-full flex justify-between">
            <Typography variant="h4">Files</Typography>
            <Tabs value={listFileType}>
              <TabsHeader
                indicatorProps={{
                  className: "bg-violet-500   shadow-none text-blue-500",
                }}
              >
                <Tab value="grid" onClick={() => toggleListFileType("grid")}>
                  <div
                    className={`flex items-center justify-center transition delay-200 gap-4 ${
                      listFileType === "grid" ? "text-white" : "text-violet-500"
                    }`}
                  >
                    <Squares2X2Icon className="h-4 w-4" />
                    Grid
                  </div>
                </Tab>
                <Tab
                  value="list"
                  className="!flex"
                  onClick={() => toggleListFileType("list")}
                >
                  <div
                    className={`flex items-center justify-center transition  delay-200 gap-4 ${
                      listFileType === "list" ? "text-white" : "text-violet-500"
                    }`}
                  >
                    <ListBulletIcon className="h-5 w-5" /> <span>List</span>
                  </div>
                </Tab>
              </TabsHeader>
            </Tabs>
          </div>

          {listFileType === "grid" && (
            <Card className="my-4  w-full shadow-none">
              <CardBody className=" p-0" ref={gridRef}>
                <div className="h-full w-full flex flex-wrap gap-4">
                  {TABLE_ROWS.map((file, index) => {
                    return (
                      <FileMenu
                        file={file}
                        folderId={file.folderId}
                        key={file.fileId}
                        handler={() => {}}
                        open={isOpenMenu[index]}
                      >
                        <Button
                          key={file.fileId}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            onOpenChangeMenu(true, index);
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          className="h-40 max-w-[160px] font-normal normal-case shadow-gray-400  hover:shadow-gray-300 border bg-transparent  border-gray-100 flex flex-[1_1_100px] p-4 flex-col items-center gap-2 rounded-xl transition  cursor-pointer "
                        >
                          <FileIcon
                            extension={file.extension}
                            className="!h-16 !w-16"
                          />
                          <Typography
                            variant="small"
                            className="mt-auto text-black"
                          >
                            {file.fileName}
                          </Typography>
                        </Button>
                      </FileMenu>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          )}

          {listFileType === "list" && (
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
                      {TABLE_ROWS.map((file, index) => {
                        const isLast = index === TABLE_ROWS.length - 1;
                        const classes = isLast
                          ? "p-4 !rounded-none"
                          : "p-4 border-b  !rounded-none border-blue-gray-50";

                        return (
                          <tr
                            key={file.fileId}
                            className="border cursor-pointer transition hover:bg-violet-100 rounded-none"
                            onClick={() => handleOpenViewFileDialog(file, true)}
                          >
                            <td className={classes}>
                              <div className="flex items-center gap-2">
                                {file.favorited && (
                                  <StarIcon className="h-4 w-4 text-amber-400" />
                                )}
                                <FileIcon extension={file.extension} />

                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal flex items-center gap-2 "
                                >
                                  {file.fileName}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {file.path === "/Root" ? "/" : file.path}
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
                                <FileMenu file={file} folderId={file.folderId}>
                                  <IconButton
                                    variant="text"
                                    className="rounded-full hover:bg-blue-100 h-8 w-8"
                                  >
                                    <EllipsisVerticalIcon className="h-5 w-5" />
                                  </IconButton>
                                </FileMenu>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Card>
              </CardBody>
            </Card>
          )}
        </section>
      </div>
    </>
  );
}
