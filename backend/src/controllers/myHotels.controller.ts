import { Request, Response } from "express";
import HotelModel from "../models/hotel.model";

// CREATE MY HOTELS
export const createMyHotel = async (req: Request, res: Response) => {
  // SUBMITTING FORM WITH IMAGES FROM FRONTEND- RECEIVES FORM DATA AS MULTIPART FORM OBJECT AT THE BACKEND
  try {
    // console.log("createMyHotel ~ req.body:", req?.body);
    const newHotel: HotelType = req.body;

    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    const hotel = new HotelModel(newHotel);
    const savedHotel = await hotel.save();
    // 4. RETURN 201 STATUS
    res.status(201).send({
      data: savedHotel,
      message: "Created new hotel Successfully",
    });
  } catch (error) {
    console.log("createMyHotel ~ error:", error);
    res.status(500).send({
      message: error,
    });
  }
};
