import { FolderCard } from "@components/FolderCard";
import { TableFolders } from "@components/TableFolders";
import {
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
  ListBulletIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { useFilesContext } from "@hooks/context/useFilesContext";
import {
  Tabs,
  Card,
  CardBody,
  Tab,
  TabsHeader,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Fragment, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function Folder() {
  const [listFileType, setListFileType] = useState<"grid" | "list">("list");
  const { files } = useFilesContext();
  const { folderId } = useParams();
  const navigate = useNavigate();

  const toggleListFileType = useCallback((type: "grid" | "list") => {
    setListFileType(type);
  }, []);

  const TABLE_HEAD = ["Name", "Path", "CreatedAt", ""];

  const filteredFiles = files.filter((folder) => folder.folderId === folderId);

  const TABLE_ROWS = filteredFiles.flatMap((folder) => {
    return folder.files.map((file) => {
      return { ...file, path: `/${folder.folderName}` };
    });
  });

  return (
    <div className="w-full h-full ">
      <div className="w-full  flex justify-between">
        <div className="flex gap-3 items-center justify-center">
          <IconButton
            className="border w-7 h-7 rounded-full flex items-center justify-center  hover:bg-transparent active:bg-transparent"
            variant="text"
            onClick={() => navigate("/home")}
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
          </IconButton>
          <Typography variant="h4">
            {filteredFiles[0]?.folderName || ""}
          </Typography>
        </div>
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
      <TableFolders TABLE_HEAD={TABLE_HEAD} TABLE_ROWS={TABLE_ROWS} />
    </div>
  );
}
