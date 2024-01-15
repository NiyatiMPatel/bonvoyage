import express from "express";
import userRouter from "./users.router";
import authRouter from "./auth.router";
import myHotelsRouter from "./myHotels.router";
import { catchAllController } from "../controllers/auth.controller";

const router = express.Router();
// USER REGISTRATION ROUTE
router.use("/api/users", userRouter);

// USER LOGIN ROUTE
router.use("/api/auth", authRouter);
export default router;

// MY HOTELS ROUTE
router.use("/api/my-hotels", myHotelsRouter);

// CATCH ALL ROUTE
router.get("*", catchAllController);
