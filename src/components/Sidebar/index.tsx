import {
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  FolderIcon,
  PresentationChartBarIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

export function Sidebar() {
  return (
    <Card className="rounded-none p-0  left-0 h-[100vh] w-full max-w-[12rem] shadow-xl   shadow-blue-gray-900/10">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List className="min-w-[100px] h-full text-gray-500 ">
        <ListItem className="bg-violet-100 focus:bg-violet-300 focus:text-violet-500 active:bg-violet-300 active:text-violet-500 text-violet-500 font-bold  hover:bg-violet-50 hover:text-violet-500">
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          All Files
        </ListItem>
        <ListItem className="focus:bg-violet-300 focus:text-violet-500 active:bg-violet-300 active:text-violet-500 hover:bg-violet-50 hover:text-violet-500">
          <ListItemPrefix>
            <FolderIcon className="h-5 w-5" />
          </ListItemPrefix>
          Shared
        </ListItem>
        <ListItem className="focus:bg-violet-300 focus:text-violet-500 active:bg-violet-300  active:text-violet-500 hover:bg-violet-50 hover:text-violet-500">
          <ListItemPrefix>
            <UserGroupIcon className="h-5 w-5" />
          </ListItemPrefix>
          Recent
        </ListItem>
        <ListItem className="focus:bg-violet-300 focus:text-violet-500 active:bg-violet-300 active:text-violet-500 hover:bg-violet-50 hover:text-violet-500">
          <ListItemPrefix>
            <StarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem className="focus:bg-violet-300 focus:text-violet-500 active:bg-violet-300  active:text-violet-500 hover:bg-violet-50 hover:text-violet-500">
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Trash
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
