import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const ProtectedRouteWrapper = () => {
  const { isLoggedIn } = useAppSelector(
    (state) => state?.user as { isLoggedIn: boolean }
  );
  if (!isLoggedIn) {
    // Redirect to the login page or handle unauthorized access
    return <Navigate to="/sign-in" />;
  }
  return <Outlet />;
};

export default ProtectedRouteWrapper;
