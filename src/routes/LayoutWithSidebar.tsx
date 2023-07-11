import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Loading } from "@components/Loading";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useFilesContext } from "@hooks/context/useFilesContext";
import { useUserContext } from "@hooks/context/useUserContext";

export function LayoutWithSidebar() {
  const [loadingState, setLoadingState] = useState<"loading" | "index">(
    Cookies.get("leviFileRefresh") ? "loading" : "index"
  );

  const { isLoading: isLoadingFiles } = useFilesContext();
  const { isLoading: isLoadingUser } = useUserContext();

  useEffect(() => {
    if (!isLoadingFiles && !isLoadingUser) {
      setTimeout(() => {
        setLoadingState("index");
      }, 1000);
    }
  }, [isLoadingFiles, isLoadingUser]);

  return (
    <>
      <Loading state={loadingState} />
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
