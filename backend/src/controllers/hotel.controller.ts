import { Request, Response } from "express";
import HotelModel from "../models/hotel.model";

export const getSearch = async (req: Request, res: Response) => {
  try {
    const page = req.query.page;
    // console.log("getSearch ~ page:", page);
    // ADD PAGINATION - NO. OF HOTELS PER PAGE - FOR THIS WE NEED PAGE NO. FROM THE FRONTEND - THIS PAGE NO. WILL BE PART OF REQ
    const pageSize = 5;
    const pageNumber = parseInt(page ? page.toString() : "1");
    //PAGE SKIP - EG. IF USER WANTS TO GO TO PAGE 3 SKIP 2 PAGES AND SHOW RESULTS FROM HOTEL NO. 11 TO 15 ON PAGE 3
    const skip = (pageNumber - 1) * pageSize;

    // PAGINATED HOTEL SEARCH/GET
    const hotels = await HotelModel.find().skip(skip).limit(pageSize);

    // PAGINATED HOTEL RESULT
    const total = await HotelModel.countDocuments(); //TOTAL NUMBER OF HOTELS IN DB
    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        currentPage: pageNumber,
        totalPages: Math.ceil(total / pageSize),
      },
    };
    // SEND THE RESPONSE
    res.status(200).send({
      data: response,
      message: "Hotels fetched Successfully",
    });
  } catch (error) {
    console.log("getSearch ~ error:", error);
    res.status(500).send({
      message: "Something went wrong",
    });
  }
};
