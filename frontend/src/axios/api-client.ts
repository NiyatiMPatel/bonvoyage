import Notification from "../layout/Toast";
import axiosInstance from "./axios-utils";
import axios from "axios";

// USER REGISTRATION
export const register = async (formData: RegisterFormValuesType) => {
  try {
    const response = await axiosInstance.post("/api/users/register", formData);
    // console.log("register ~ response:", response);

    if (response?.status !== 200) {
      Notification.error(response?.data?.message);
      throw new Error(response?.data);
    }
    Notification.success(response?.data?.message);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("register ~ error:", error);
      Notification.error(error?.response?.data?.message || error?.message);
    }
    throw new Error(error as string | undefined);
  }
};

// USER LOGIN
export const login = async (formData: SignInFromValueType) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", formData);
    // console.log("login ~ response:", response);

    if (response?.status !== 200) {
      Notification.error(response?.data?.message);
      throw new Error(response?.data);
    }
    Notification.success(response?.data?.message);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("login ~ error:", error);
      Notification.error(error?.response?.data?.message || error?.message);
    }
    throw new Error(error as string | undefined);
  }
};

// USER LOGIN STATE VALIDATION THROUGH HTTP COOKIE VALIDATION
export const validateToken = async () => {
  try {
    const response = await axiosInstance.get("/api/auth/validate-token", {
      withCredentials: true,
    });
    // console.log("validateToken ~ response:", response);
    if (response?.status !== 200) {
      throw new Error("Token invalid");
    }
    return response;
  } catch (error) {
    console.log("validateToken ~ error:", error);
    throw new Error(error as string | undefined);
  }
};

// USER LOGOUT
export const logout = async () => {
  try {
    const response = await axiosInstance.post("/api/auth/logout");
    console.log("login ~ response:", response);

    if (response?.status !== 200) {
      Notification.error(response?.data?.message);
      throw new Error(response?.data);
    }
    Notification.success(response?.data?.message);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("login ~ error:", error);
      Notification.error(error?.response?.data?.message || error?.message);
    }
    throw new Error(error as string | undefined);
  }
};

// ADD MY-HOTEL
export const addMyHotel = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post("/api/my-hotels", formData);
    // console.log("addMyHotel ~ response:", response);

    if (response?.status !== 201 ?? response?.status !== 200) {
      Notification.error(response?.data?.message);
      throw new Error(response?.data);
    }
    Notification.success(response?.data?.message);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("addMyHotel ~ error:", error);
      Notification.error(error?.response?.data?.message || error?.message);
    }
    throw new Error(error as string | undefined);
  }
};

// GET ALL MY-HOTELS
export const getMyHotels = async (): Promise<HotelType[]> => {
  try {
    const response = await axiosInstance.get("/api/my-hotels");
    // console.log("getMyHotels ~ response:", response);

    if (response?.status !== 200) {
      Notification.error(response?.data?.message);
      throw new Error(response?.data);
    }
    // Notification.success(response?.data?.message);
    return response?.data?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("getMyHotels ~ error:", error);
      Notification.error(error?.response?.data?.message || error?.message);
    }
    throw new Error(error as string | undefined);
  }
};

// GET SINGLE HOTEL
export const getMyHotelById = async (hotelId: string): Promise<HotelType> => {
  try {
    const response = await axiosInstance.get(`/api/my-hotels/${hotelId}`);
    // console.log("getMyHotelById ~ response:", response);

    if (response?.status !== 200) {
      Notification.error(response?.data?.message);
      throw new Error(response?.data);
    }
    // Notification.success(response?.data?.message);
    return response?.data?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("getMyHotelById ~ error:", error);
      Notification.error(error?.response?.data?.message || error?.message);
    }
    throw new Error(error as string | undefined);
  }
};

// UPDATE SINGLE HOTEL
export const updateMyHotel = async (formData: FormData) => {
  try {
    const response = await axiosInstance.put(
      `/api/my-hotels/${formData.get("hotelId")}`,
      formData
    );
    // console.log("updateMyHotel ~ response:", response);

    if (response?.status !== 201 ?? response?.status !== 200) {
      Notification.error(response?.data?.message);
      throw new Error(response?.data);
    }
    Notification.success(response?.data?.message);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("updateMyHotel ~ error:", error);
      Notification.error(error?.response?.data?.message || error?.message);
    }
    throw new Error(error as string | undefined);
  }
};

// GET HOTELS BASED ON SEARCH
export const searchHotels = async (
  searchQueryParams: SearchQueryParams
): Promise<HotelSearchResponse> => {
  try {
    const queryParams = new URLSearchParams(); // predefined object
    queryParams.append("destination", searchQueryParams.destination || "");
    queryParams.append("checkIn", searchQueryParams.checkIn || "");
    queryParams.append("checkOut", searchQueryParams.checkOut || "");
    queryParams.append("adultCount", searchQueryParams.adultCount || "");
    queryParams.append("childCount", searchQueryParams.childCount || "");
    queryParams.append("page", searchQueryParams.page || "");

    const response = await axiosInstance.get(
      `/api/hotels/search?${queryParams}`
    );
    if (response?.status !== 200) {
      Notification.error(response?.data?.message);
      throw new Error(response?.data);
    }
    // Notification.success(response?.data?.message);
    // console.log("searchHotels ~ response:", response?.data?.data);
    return response?.data?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("searchHotels ~ error:", error);
      Notification.error(error?.response?.data?.message || error?.message);
    }
    throw new Error(error as string | undefined);
  }
};
