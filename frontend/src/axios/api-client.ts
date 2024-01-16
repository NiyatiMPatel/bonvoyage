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
// export const addMyHotel = async (formData: HotelFormData) => {
export const addMyHotel = async (formData: FormData) => {
  console.log("addMyHotel ~ formData:", formData);
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
