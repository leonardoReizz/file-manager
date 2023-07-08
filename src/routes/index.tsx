import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { LayoutWithSidebar } from "./LayoutWithSidebar";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { UserContextProvider } from "../context/UserContext";
import { FilesContextProvider } from "../context/FilesContext";
import { Folder } from "@pages/Folder";
import { Loading } from "@components/Loading";
import { ProtectedRoutes } from "./ProtectedRoutes";

interface AppRoutesProps {
  state: "loading" | "index";
  onChangeState: (newState: "loading" | "index") => void;
}

export function AppRoutes({ state, onChangeState }: AppRoutesProps) {
  return (
    <>
      <Loading state={state} />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoutes />}>
          <Route
            element={
              <UserContextProvider>
                <FilesContextProvider onChangeState={onChangeState}>
                  <LayoutWithSidebar />
                </FilesContextProvider>
              </UserContextProvider>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/folder/:folderId">
              <Route path="" element={<Folder />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}
