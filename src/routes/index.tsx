import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { LayoutWithSidebar } from "./LayoutWithSidebar";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { UserContextProvider } from "../context/UserContext";
import { FilesContextProvider } from "../context/FilesContext";
import { Folder } from "@pages/Folder";
import { Loading } from "@components/Loading";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { ProfileSettings } from "@pages/ProfileSettings";
import { SecuritySettings } from "@pages/SecuritySettings";
import { LayoutWithSettingsSidebar } from "./LayoutWithSettingsSidebar";
import { Favorite } from "@pages/Favorite";
import { ViewFileDialogContextProvider } from "../context/ViewFileDialogContext";

export function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoutes />}>
          <Route
            element={
              <UserContextProvider>
                <FilesContextProvider>
                  <LayoutWithSidebar />
                </FilesContextProvider>
              </UserContextProvider>
            }
          >
            <Route
              element={
                <ViewFileDialogContextProvider>
                  <Outlet />
                </ViewFileDialogContextProvider>
              }
            >
              <Route path="/home" element={<Home />} />
              <Route path="favorite" element={<Favorite />} />
            </Route>
            <Route path="settings" element={<LayoutWithSettingsSidebar />}>
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="security" element={<SecuritySettings />} />
            </Route>
            <Route path="/folder/:folderId">
              <Route path="" element={<Folder />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}
