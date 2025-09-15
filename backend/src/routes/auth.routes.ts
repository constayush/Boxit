import express from "express";
import { loginUser, logoutUser, registerUser, returnUser, updateUser } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";
const authRouter=  express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.get("/me", protect, returnUser);
authRouter.patch("/me", protect, updateUser);
authRouter.post("/logout", protect, logoutUser);
export default authRouter;