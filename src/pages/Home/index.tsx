import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/20/solid";
import {
  Card,
  CardBody,
  Collapse,
  IconButton,
  Tab,
  Tabs,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import { Fragment, useState } from "react";
import { FolderCard } from "../../components/FolderCard";
import { useHome } from "@hooks/useHome";
import { DeleteFolderDialog } from "./components/DeleteFolderDialog";
import { useNavigate } from "react-router-dom";
import pdfIcon from "@assets/file-icons/PDF.svg";
import aiIcon from "@assets/file-icons/AI.svg";
import docIcon from "@assets/file-icons/DOC.svg";
import jpgIcon from "@assets/file-icons/JPG.svg";
import pptIcon from "@assets/file-icons/PPT.svg";
import psdIcon from "@assets/file-icons/PSD.svg";
import svgIcon from "@assets/file-icons/SVG.svg";
import xlsIcon from "@assets/file-icons/XLS.svg";
import zipIcon from "@assets/file-icons/ZIP.svg";
import cssIcon from "@assets/file-icons/CSS.svg";
import htmlIcon from "@assets/file-icons/HTML.svg";
import tsIcon from "@assets/file-icons/TS.svg";
import txtIcon from "@assets/file-icons/TXT.svg";
import jsIcon from "@assets/file-icons/JS.svg";
import gifIcon from "@assets/file-icons/GIF.svg";
import mp3Icon from "@assets/file-icons/MP3.svg";

export function Home() {
  const {
    files,
    handleDeleteFolder,
    onOpenChangeDeleteFolderDialog,
    isOpenDeleteFolderDialog,
    selectedFolder,
    mutationPinFolder,
    mutationUnpinFolder,
    mutationFavoriteFile,
    mutationUnfavoriteFile,
  } = useHome();

  const [listFileType, setListFileType] = useState<"grid" | "list">("list");
  const [openPinned, setOpenPinned] = useState(true);
  const [openFolders, setOpenFolders] = useState(true);
  const [openFiles, setOpenFiles] = useState(true);
  const toggleOpenPinned = () => setOpenPinned((cur) => !cur);
  const toggleOpenFolders = () => setOpenFolders((cur) => !cur);
  const toggleOpenFiles = () => setOpenFiles((cur) => !cur);
  const toggleListFileType = (value: "grid" | "list") => setListFileType(value);

  const TABLE_HEAD = ["Name", "Path", "CreatedAt", ""];

  const TABLE_ROWS = files.flatMap((folder) => {
    return folder.files.map((file) => {
      return { ...file, path: `/${folder.folderName}` };
    });
  });

  const navigate = useNavigate();

  return (
    <>
      {selectedFolder && (
        <DeleteFolderDialog
          handler={onOpenChangeDeleteFolderDialog}
          open={isOpenDeleteFolderDialog}
          folder={selectedFolder}
        />
      )}
      <div className="w-full">
        <section>
          <Typography variant="h4" onClick={toggleOpenPinned}>
            Pinned Folders
          </Typography>

          <Collapse open={openPinned}>
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
          </Collapse>
        </section>
        <section>
          <Typography variant="h4" onClick={toggleOpenFolders}>
            Folders
          </Typography>

          <Collapse open={openFolders}>
            <Card className="my-4  w-full shadow-none">
              <CardBody className="grid grid-cols-4 gap-4 w-full p-0">
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
          </Collapse>
        </section>
        <section>
          <div className="w-full flex justify-between">
            <Typography variant="h4" onClick={toggleOpenFiles}>
              Files
            </Typography>
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
          <Collapse open={openFiles}>
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
                      {TABLE_ROWS.map(
                        ({ fileName, fileId, path, extension }, index) => {
                          console.log(extension);
                          const isLast = index === TABLE_ROWS.length - 1;
                          const classes = isLast
                            ? "p-4"
                            : "p-4 border-b  rounded-full border-blue-gray-50";

                          return (
                            <tr key={fileId} className="border">
                              <td className={classes}>
                                <div className="flex items-center gap-2">
                                  <img
                                    className="h-6 w-6"
                                    src={
                                      extension.startsWith(".pdf")
                                        ? pdfIcon
                                        : extension.startsWith(".ai")
                                        ? aiIcon
                                        : extension.startsWith(".doc")
                                        ? docIcon
                                        : extension.startsWith(".jpg")
                                        ? jpgIcon
                                        : extension.startsWith(".ppt")
                                        ? pptIcon
                                        : extension.startsWith(".psd")
                                        ? psdIcon
                                        : extension.startsWith(".svg")
                                        ? svgIcon
                                        : extension.startsWith(".xls")
                                        ? xlsIcon
                                        : extension.startsWith(".css")
                                        ? cssIcon
                                        : extension.startsWith(".html")
                                        ? htmlIcon
                                        : extension.startsWith(".ts")
                                        ? tsIcon
                                        : extension.startsWith(".txt")
                                        ? txtIcon
                                        : extension.startsWith(".gif")
                                        ? gifIcon
                                        : extension.startsWith(".mp3")
                                        ? mp3Icon
                                        : extension.startsWith(".zip")
                                        ? zipIcon
                                        : extension.startsWith(".js")
                                        ? jsIcon
                                        : zipIcon
                                    }
                                    alt=""
                                  />

                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
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
                                  <Typography
                                    as="a"
                                    href="#"
                                    variant="small"
                                    color="blue"
                                    className="font-medium"
                                  >
                                    Edit
                                  </Typography>
                                  <IconButton
                                    variant="text"
                                    onClick={() =>
                                      mutationFavoriteFile.mutate(fileId)
                                    }
                                  >
                                    FAV
                                  </IconButton>
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
          </Collapse>
        </section>
      </div>
    </>
  );
}
