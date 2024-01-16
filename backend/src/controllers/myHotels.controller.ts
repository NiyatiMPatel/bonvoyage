import { Request, Response } from "express";
import cloudinary from "cloudinary";
import HotelModel from "../models/hotel.model";

// CREATE MY HOTELS
export const createMyHotel = async (req: Request, res: Response) => {
  try {
    // console.log("createMyHotel ~ req.files:", req.files);
    // console.log("createMyHotel ~ req.body:", req?.body);

    const reqImageFiles = req.files as Express.Multer.File[];
    // console.log("createMyHotel ~ reqImageFiles:", reqImageFiles);

    const newHotel: HotelType = req.body;

    //  1. UPLOAD IMAGES TO CLOUDINARY
    const imageUrls = await uploadImages(reqImageFiles);
    // 2. IF UPLOAD WAS SUCCESSFUL, ADD URLS TO NEW HOTEL
    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;
    // 3. SAVE NEW HOTEL IN DATABASE
    const hotel = new HotelModel(newHotel);
    const savedHotel = await hotel.save();
    // RETURN 201 RESPONSE
    res.status(201).send({
      data: savedHotel,
      message: "Created new hotel Successfully",
    });
  } catch (error) {
    console.log("Error creating hotels");
    res.status(500).send({
      message: error,
    });
  }
};

// GET ALL MY HOTELS

export const readMyHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await HotelModel.find({ userId: req.userId });
    res.status(200).send({
      data: hotels,
      message: "Hotels fetched Successfully",
    });
  } catch (error) {
    console.log("Error fetching hotels");
    res.status(500).send({
      message: error,
    });
  }
};

// HEPLER FUNCTION FOR IMAGE UPLOAD
async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles?.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}
