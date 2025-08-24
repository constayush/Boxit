import express from "express";
import cors from "cors";
import connectDB from "./configs/db";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

export default app;
