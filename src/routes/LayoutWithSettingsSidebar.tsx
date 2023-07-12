import { SidebarSettings } from "@components/SidebarSettings";
import { Outlet } from "react-router-dom";

export function LayoutWithSettingsSidebar() {
  return (
    <>
      <div className=" w-screen h-screen flex overflow-hidden">
        <SidebarSettings />

        <div className="flex w-full h-full items-center justify-center">
          <div className="flex w-full h-full max-w-screen-2xl p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
