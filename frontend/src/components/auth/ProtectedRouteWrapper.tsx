import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const ProtectedRouteWrapper: React.FC<ChildrenProp> = ({ children }) => {
  const { isLoggedIn } = useAppSelector(
    (state) => state?.user as { isLoggedIn: boolean }
  );
  if (!isLoggedIn) {
    // Redirect to the login page or handle unauthorized access
    return <Navigate to="/sign-in" />;
  }
  return <>{children}</>;
};

export default ProtectedRouteWrapper;
