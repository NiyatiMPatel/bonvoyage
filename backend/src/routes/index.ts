import express from "express";
import userRouter from "./users.router";
import authRouter from "./auth.router";

const router = express.Router();
// USER REGISTRATION ROUTE
router.use("/api/users", userRouter);

// USER LOGIN ROUTE
router.use("/api/auth", authRouter);
export default router;
