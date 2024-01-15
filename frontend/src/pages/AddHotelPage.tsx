import { useMutation } from "@tanstack/react-query";
import ManageHotelForm from "../components/hotel/ManageHotelForm";
import * as apiClient from "../axios/api-client";

const AddHotelPage = () => {
  const { data, mutate, isPending } = useMutation({
    mutationFn: apiClient.addMyHotel,
    onSuccess: () => {
      // navigate("/");
    },
    onError: (error: Error) => {
      console.log("Register ~ error:", error);
    },
  });
  // FormData HERE IS THE PREDEFINED TYPE PROVIDED TO HANDLE FORMDATA
  const saveHandler = (hotelFormData: HotelFormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm data={data} onSave={saveHandler} isPending={isPending} />
  );
};

export default AddHotelPage;
