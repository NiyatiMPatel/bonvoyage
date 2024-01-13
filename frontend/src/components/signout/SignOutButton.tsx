import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../../axios/api-client";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  // REACT QUERY ACCESS AT GLOBAL LEVEL
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, mutate, isPending } = useMutation({
    mutationFn: apiClient.logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate("/");
    },
    onError: (error: Error) => {
      console.log("Register ~ error:", error);
    },
  });
  console.log("Header ~ data:", data);

  const logoutHandler = async () => {
    mutate();
  };
  return (
    <button
      type="submit"
      onClick={logoutHandler}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 "
    >
      {isPending ? "Logging Out" : "Log Out"}
    </button>
  );
};

export default SignOutButton;
