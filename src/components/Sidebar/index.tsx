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
import { useNavigate } from "react-router-dom";

export function Sidebar() {
  const navigate = useNavigate();

  return (
    <Card className="rounded-none p-0  left-0 h-[100vh] w-full max-w-[13.5rem] shadow-xl   shadow-blue-gray-900/10">
      <div className="mb-2 p-3">
        <Typography variant="h5" color="blue-gray">
          File Manager
        </Typography>
      </div>
      <List className="min-w-[100px] h-full text-gray-500 text-sm">
        <ListItem
          onClick={() => navigate("/home")}
          className="h-[40px] bg-violet-100 focus:bg-violet-300 focus:text-violet-500 active:bg-violet-300 active:text-violet-500 text-violet-500 font-bold  hover:bg-violet-50 hover:text-violet-500"
        >
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          All Files
        </ListItem>
        <ListItem className="h-[40px] focus:bg-violet-300 focus:text-violet-500 active:bg-violet-300 active:text-violet-500 hover:bg-violet-50 hover:text-violet-500">
          <ListItemPrefix>
            <FolderIcon className="h-5 w-5" />
          </ListItemPrefix>
          Favorite
        </ListItem>
        <ListItem
          onClick={() => navigate("/settings/profile")}
          className="h-[40px] focus:bg-violet-300 focus:text-violet-500 active:bg-violet-300 active:text-violet-500 hover:bg-violet-50 hover:text-violet-500"
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
