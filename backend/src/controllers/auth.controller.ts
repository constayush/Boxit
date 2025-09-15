import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";



interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    username: string;
    xp: number;
    level: number;
    streak: number;
    achievements: string[];
  };
}

// 🔐 Generate JWT
const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
};

// REGISTER
export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username taken" });

    const user = await User.create({ username, password });

    const token = generateToken((user._id as mongoose.Types.ObjectId).toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.status(201).json({ 
      success: true,
      message: "User created ✅",
      user: {
        _id: user._id,
        username: user.username,
        xp: user.xp,
        level: user.level,
        streak: user.streak,
        achievements: user.achievements,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// LOGIN
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken((user._id as mongoose.Types.ObjectId).toString());

    // Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // "none" if cross-site and using https
    });

    res.json({
      success: true,
      message: "Login successful ✅",
      user: {
        _id: user._id,
        username: user.username,
        xp: user.xp,
        level: user.level,
        streak: user.streak,
        achievements: user.achievements,
      },
    });

    user.updateStreak();
    await user.save();

  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const logoutUser = (req: Request, res:Response) => {
 
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  res.json({ success: true, message: "Logged out ✅" });
}


export const returnUser =  async (req: AuthenticatedRequest, res: Response) => {
  try {
    // req.user is attached by the protect middleware
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(req.user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
 
export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { action, amount } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let updateQuery = {};

    switch (action) {
      case "addXp":
        if (typeof amount !== "number") {
          return res.status(400).json({ message: "Invalid XP amount" });
        }
        updateQuery = { $inc: { xp: amount } };
        break;

      case "incrementStreak":
        updateQuery = { $inc: { streak: 1 } };
        break;

      case "resetStreak":
        updateQuery = { $set: { streak: 0 } };
        break;

      default:
        return res.status(400).json({ message: "Invalid action" });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateQuery, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const { password, ...safeUser } = updatedUser.toObject();

    res.json({ success: true, user: safeUser });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

