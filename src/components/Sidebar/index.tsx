import {
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  FolderIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/20/solid";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function Sidebar() {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <Card
      className={`rounded-none transition-all p-0 left-0 h-[100vh] w-full shadow-xl   shadow-blue-gray-900/10  ${
        isOpenSidebar
          ? "max-w-[13.5rem]"
          : "max-w-[0px] invisible opacity-0  md:!visible  md:!max-w-[13.5rem]  md:!opacity-100"
      }`}
    >
      <div className="mb-2 p-3">
        <Typography variant="h5" color="blue-gray">
          File Manager
        </Typography>
      </div>
      <List className="min-w-[100px] h-full text-gray-500 text-sm">
        <ListItem
          onClick={() => navigate("/home")}
          className={`${
            pathname === "/home" && "bg-violet-100 text-violet-500 font-bold"
          } h-[40px]  focus:bg-violet-100 focus:text-violet-500  active:text-violet-500  hover:bg-violet-50 hover:text-violet-500`}
        >
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          All Files
        </ListItem>
        <ListItem
          onClick={() => navigate("/favorite")}
          className={`${
            pathname === "/favorite" &&
            "bg-violet-100 text-violet-500 font-bold"
          } h-[40px]  focus:bg-violet-100 focus:text-violet-500 active:bg-violet-300 active:text-violet-500  hover:bg-violet-50 hover:text-violet-500`}
        >
          <ListItemPrefix>
            <FolderIcon className="h-5 w-5" />
          </ListItemPrefix>
          Favorite
        </ListItem>
        <ListItem
          onClick={() => navigate("/settings/profile")}
          className={`${
            pathname.includes("/settings") &&
            "bg-violet-100 text-violet-500 font-bold"
          } h-[40px]  focus:bg-violet-100 focus:text-violet-500 active:bg-violet-300 active:text-violet-500   hover:bg-violet-50 hover:text-violet-500`}
        >
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem className="mt-auto focus:bg-violet-300 focus:text-violet-500 active:bg-violet-300  active:text-violet-500 hover:bg-violet-50 hover:text-violet-500">
          <ListItemPrefix>
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log out
        </ListItem>
      </List>
    </Card>
  );
}
