import {
  FolderIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/20/solid";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";

export function SidebarSettings() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Card className="rounded-none p-0  left-0 h-[100vh] w-full max-w-[13.5rem] shadow-none">
      <List className="min-w-[100px] h-full text-gray-500 text-sm">
        <ListItem
          onClick={() => navigate("/settings/profile")}
          className={`${
            pathname === "/settings/profile" &&
            "bg-violet-100 text-violet-500 font-bold"
          } h-[40px]  focus:bg-violet-100 focus:text-violet-500 active:bg-violet-300 active:text-violet-500   hover:bg-violet-50 hover:text-violet-500`}
        >
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem
          onClick={() => navigate("/settings/security")}
          className={`${
            pathname === "/settings/security" &&
            "bg-violet-100 text-violet-500 font-bold"
          } h-[40px]  focus:bg-violet-100 focus:text-violet-500 active:bg-violet-300 active:text-violet-500   hover:bg-violet-50 hover:text-violet-500`}
        >
          <ListItemPrefix>
            <FolderIcon className="h-5 w-5" />
          </ListItemPrefix>
          Security
        </ListItem>
      </List>
    </Card>
  );
}
