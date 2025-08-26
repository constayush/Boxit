import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
let token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

if (!token) return res.status(401).json({ message: "Not authorized" });

try {
  const decoded: any = jwt.verify(token, JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) return res.status(401).json({ message: "User not found" });

  req.user = user;
  next();
} catch (err) {
  res.status(401).json({ message: "Token invalid" });
}

};
