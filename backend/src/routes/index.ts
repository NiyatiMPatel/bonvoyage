import express from "express";
import userRouter from "./users.router";
import authRouter from "./auth.router";
import myHotelsRouter from "./myHotels.router";

const router = express.Router();
// USER REGISTRATION ROUTE
router.use("/api/users", userRouter);

// USER LOGIN ROUTE
router.use("/api/auth", authRouter);
export default router;

// MY HOTELS ROUTE
router.use("/api/my-hotels", myHotelsRouter);
