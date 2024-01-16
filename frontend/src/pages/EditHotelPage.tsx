import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../axios/api-client";
import ManageHotelForm from "../components/hotel/ManageHotelForm";

const EditHotelPage = () => {
  const { hotelId } = useParams();
  // console.log("EditHotelPage ~ hoteId:", hotelId);
  const { data } = useQuery({
    queryKey: ["fetchMyHotelById", hotelId],
    queryFn: () => apiClient.getMyHotelById(hotelId!),
  });
  // console.log("EditHotelPage ~ data:", data);
  return <ManageHotelForm hotel={data!} />;
};

export default EditHotelPage;
