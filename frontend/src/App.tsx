import { lazy } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "./axios/api-client";
import { useEffect } from "react";
import { setLoggedIn } from "./redux/userSlice";
import { useAppDispatch } from "./redux/hooks";

const RootLayout = lazy(() => import("./layout/Layout"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));

let router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "sign-in",
        element: <SignInPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

function App() {
  const dispatch = useAppDispatch();
  const { isError } = useQuery({
    // IDENTIFIER TO REUSE THE DATA LATER WHEN REQUIRED
    queryKey: ["validateToken"],
    // API CALLING FUNCTION
    queryFn: apiClient.validateToken,
    retry: false,
  });
  useEffect(() => {
    dispatch(setLoggedIn(!isError));
  }, [isError]);
  return (
    <>
      <ToastContainer />
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <RouterProvider router={router} />
      {/* </Suspense> */}
    </>
  );
}

export default App;