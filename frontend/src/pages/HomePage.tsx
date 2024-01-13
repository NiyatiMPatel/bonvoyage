import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../axios/api-client";
import { useEffect } from "react";
import { setLoggedIn } from "../redux/userSlice";
import { useAppDispatch } from "../redux/hooks";

const HomePage = () => {
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
  return <div>HomePage</div>;
};

export default HomePage;
