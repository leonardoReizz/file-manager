import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

export function LayoutWithSidebar() {
  return (
    <>
      <div className=" w-screen h-screen flex overflow-hidden">
        <Sidebar />
        <div className="w-full h-full flex flex-col  items-start justify-start gap-4 overflow-y-auto overflow-x-hidden ">
          <Navbar />
          <div className="flex w-full h-full items-center justify-center">
            <div className="flex w-full h-full max-w-screen-2xl p-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
