import { Request, Response } from "express";
import HotelModel from "../models/hotel.model";

// CREATE MY HOTELS
export const createMyHotel = async (req: Request, res: Response) => {
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
