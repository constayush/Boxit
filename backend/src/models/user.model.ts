import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  xp: number;
  level: number;
  streak: number;
  lastLogin?: Date;
  achievements: string[];
  matchPassword(enteredPassword: string): Promise<boolean>;
  addXP(amount: number): void;
  updateStreak(): void;
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
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
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
});

// 🔒 Hash password
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
  }
};

// 🔥 Update streak
// In your userSchema.methods
userSchema.methods.updateStreak = function () {
  const today = new Date();
  const lastLogin = this.lastLogin ? new Date(this.lastLogin) : null;

  if (typeof this.streak !== "number") this.streak = 0;

  if (!lastLogin) {
    this.streak = 1;
    this.lastLogin = today;
    return;
  }

  // Normalize both dates to UTC midnight
  const startOfTodayUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfLastLoginUTC = Date.UTC(
    lastLogin.getFullYear(),
    lastLogin.getMonth(),
    lastLogin.getDate()
  );

  const diffDays = Math.floor((startOfTodayUTC - startOfLastLoginUTC) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return;       // same day → do nothing
  if (diffDays === 1) this.streak++; // consecutive day → increment
  else this.streak = 1;             // missed days → reset

  // Save lastLogin as full timestamp
  this.lastLogin = today;
};







const User = mongoose.model<IUser>("User", userSchema);
export default User;
