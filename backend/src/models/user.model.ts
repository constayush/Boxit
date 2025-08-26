import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Punches + associated videos
const punchMap: Record<string, { videos: string[] }> = {
  jab: { videos: ["vid-jab-basics", "vid-jab-drill"] },
  cross: { videos: ["vid-cross-basics"] },
  hook: { videos: ["vid-hook-basics", "vid-hook-defense"] },
  uppercut: { videos: ["vid-uppercut-power"] },
};

interface IUser extends mongoose.Document {
  username: string;
  password: string;
  xp: number;
  level: number;
  streak: number;
  lastLogin?: Date;
  achievements: string[];
  unlockedPunches: { punchId: string; unlockedAt: Date }[];
  matchPassword(enteredPassword: string): Promise<boolean>;
  addXP(amount: number): void;
  updateStreak(): void;
  unlockPunch(punchId: string): void;
  getUnlockedContent(): { punches: string[]; videos: string[] };
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
    maxlength: 100,
  },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  streak: { type: Number, default: 0 },
  lastLogin: Date,
  achievements: [String],
  unlockedPunches: [{ punchId: String, unlockedAt: Date }],
});

// 🔒 Password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ Compare password
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 🎮 Add XP + level-up
userSchema.methods.addXP = function (amount: number) {
  this.xp += amount;

  const requiredXP = this.level * 100;
  if (this.xp >= requiredXP) {
    this.level++;
    this.xp -= requiredXP;

    // Automatically unlock punch for new level
    const punchKeys = Object.keys(punchMap);
    if (this.level <= punchKeys.length) {
      const punchToUnlock = punchKeys[this.level - 1]; // level 1 → index 0
      this.unlockPunch(punchToUnlock);
    }
  }
};

// 🔥 Update streak based on login
userSchema.methods.updateStreak = function () {
  const today = new Date();
  if (!this.lastLogin) {
    this.streak = 1;
  } else {
    const diffDays =
      (today.getTime() - this.lastLogin.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays < 1) {
      // already logged today → do nothing
    } else if (diffDays < 2) {
      this.streak++;
    } else {
      this.streak = 1;
    }
  }
  this.lastLogin = today;
};

// 🥊 Unlock punch
userSchema.methods.unlockPunch = function (punchId: string) {
  if (!this.unlockedPunches.find((p: any) => p.punchId === punchId)) {
    this.unlockedPunches.push({ punchId, unlockedAt: new Date() });
  }
};

// 🎯 Get all unlocked content (punches + videos)
userSchema.methods.getUnlockedContent = function () {
  const punches = this.unlockedPunches.map((p: any) => p.punchId);
  const videos = punches.flatMap((p: string) => punchMap[p].videos);
  return { punches, videos };
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;
