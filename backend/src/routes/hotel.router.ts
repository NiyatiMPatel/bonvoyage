import express from "express";
import { getSearch } from "../controllers/hotel.controller";

const router = express.Router();

// GET SEARCH
router.get("/search", getSearch);

export default router;
