import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export function ProtectedRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("leviFileRefresh")) {
      navigate("/");
    }
  }, [navigate]);

  if (Cookies.get("leviFileRefresh")) {
    return <Outlet />;
  }

  return <>Not Permission</>;
}
