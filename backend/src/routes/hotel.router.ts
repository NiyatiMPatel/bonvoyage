import express from "express";
import { param } from "express-validator";
import { getSearch, getsearchedHotel } from "../controllers/hotel.controller";

const router = express.Router();

// GET SEARCH
router.get("/search", getSearch);

// GET SINGLE HOTEL
router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  getsearchedHotel
);

export default router;
