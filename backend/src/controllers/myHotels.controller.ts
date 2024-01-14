import { Request, Response } from "express";
import cloudinary from "cloudinary";
import HotelModel from "../models/hotel.model";

// CREATE MY HOTELS
export const createMyHotel = async (req: Request, res: Response) => {
  // SUBMITTING FORM WITH IMAGES FROM FRONTEND- RECEIVES FORM DATA AS MULTIPART FORM OBJECT AT THE BACKEND
  try {
    const imageFiles = req.files as Express.Multer.File[]; // IMAGE FILES ARRAY FROM MULTER - UPLAODED FROM FRONTEND
    const newHotel: HotelType = req.body;

    // 1. UPLOAD IMAGES TO CLOUDINARY
    // MAP OVER ARRAY OF IMAGES BECAUSE CAN UPLOAD ONLY 1 IMAGE AT A TIME TO CLOUDINARY
    const uploadPromises = imageFiles.map(async (image) => {
      // ENCODE IMAGE AS BASE64 STRING
      const b64 = Buffer.from(image.buffer).toString("base64");
      // IDENTIFY IMAGE TYPE AND ATTACH THAT TO BASE64 STRING
      let dataURI = `data:${image.mimetype};base64,${b64}`;
      // UPLOAD IMAGE TO CLOUDINARY
      const res = await cloudinary.v2.uploader.upload(dataURI); //returns hosted url
      return res.url; // <= ARRAY OF PROMISES
    });
    const imageUrls = await Promise.all(uploadPromises);

    // 2. IF UPLOAD WAS SUCCESSFUL, ADD URLS TO NEW HOTEL
    newHotel.imageUrls = imageUrls;

    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    // 3. SAVE NEW HOTEL IN DATABASE
    const hotel = new HotelModel(newHotel);
    const savedHotel = await hotel.save();
    // 4. RETURN 201 STATUS
    res.status(201).send({
      data: savedHotel,
      message: "Could not create new hotel",
    });
  } catch (error) {
    console.log("createMyHotel ~ error:", error);
    res.status(500).send({
      message: "Something went wrong",
    });
  }
};
