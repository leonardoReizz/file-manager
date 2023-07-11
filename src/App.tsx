import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import apiAuth from "@services/http/auth/index";
import { QueryClient, QueryClientProvider } from "react-query";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import { toastOptions } from "@utils/toastOptions";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        onError: (error: any) => {
          if (import.meta.env.NODE_ENV === "prod") {
            console.clear();
          }
          if (
            error?.response?.status === 401 &&
            error?.response?.data?.detail !== "Incorrect username or password"
          ) {
            apiAuth
              .refreshToken()
              .then((result) => {
                if (result?.status === 200) {
                  const expirationDateToken = new Date();
                  const expirationDateRefreshToken = new Date();
                  expirationDateRefreshToken.setTime(
                    expirationDateRefreshToken.getTime() + 7 * 60 * 60 * 1000
                  ); // 7 hours to milliseconds
                  expirationDateToken.setTime(
                    expirationDateToken.getTime() + 50 * 60 * 1000
                  ); // 50 minutes to milissegundos
                  Cookies.set(
                    "leviFileRefresh",
                    `${result.data.token_type} ${result.data.refreshToken}`,
                    { expires: expirationDateRefreshToken }
                  );
                  Cookies.set(
                    "leviFileToken",
                    `${result.data.token_type} ${result.data.accessToken}`,
                    { expires: expirationDateToken }
                  );
                } else {
                  // window.location.href = "/";
                  // setState("index");
                }
                return result;
              })
              .catch((error) => {
                Cookies.remove("leviFileRefresh");
                console.log(error);
                window.location.href = "/";
                return error;
              });
            queryClient.invalidateQueries();
          }
        },
      },
    },
  });

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
        <ToastContainer {...toastOptions} style={{ zIndex: "99999" }} />
      </BrowserRouter>
    </>
  );
}

export default App;
