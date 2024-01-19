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
const ProtectedRouteWrapper = lazy(
  () => import("./components/auth/ProtectedRouteWrapper")
);
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const AddHotelPage = lazy(() => import("./pages/AddHotelPage"));
const MyHotelsPage = lazy(() => import("./pages/MyHotelsPage"));
const EditHotelPage = lazy(() => import("./pages/EditHotelPage"));
const HotelDetailPage = lazy(() => import("./pages/HotelDetailPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));

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
        path: "/detail/:hotelId",
        element: <HotelDetailPage />,
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
      {
        element: <ProtectedRouteWrapper />,
        children: [
          {
            path: `hotel/:hotelId/booking`,
            element: <BookingPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "add-hotel",
            element: <AddHotelPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "my-hotels",
            element: <MyHotelsPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: `edit-hotel/:hotelId`,
            element: <EditHotelPage />,
            errorElement: <ErrorPage />,
          },
        ],
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
  const { data: verifyToken, isError } = useQuery({
    // IDENTIFIER TO REUSE THE DATA LATER WHEN REQUIRED
    queryKey: ["validateToken"],
    // API CALLING FUNCTION
    queryFn: apiClient.validateToken,
    retry: false,
  });

  useEffect(() => {
    if (verifyToken) {
      dispatch(setLoggedIn(!isError));
    }
  }, [dispatch, verifyToken, isError]);
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
