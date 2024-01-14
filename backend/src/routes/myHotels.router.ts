import express from "express";
import multer from "multer";
import { body } from "express-validator";
import { createMyHotel } from "../controllers/myHotels.controller";
import verifyToken from "../middleware/auth.middleware";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 5 * 1024 * 1024, //5MB SIZE IN BITS
  },
});
console.log("upload:", upload);

const router = express.Router();

// CREATE MY HOTEL
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  createMyHotel
);

export default router;
