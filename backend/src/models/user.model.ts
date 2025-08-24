import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
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
  achievements: [String], // badge IDs
  unlockedPunches: [
    {
      punchId: String, // e.g. "jab", "cross", "hook"
      unlockedAt: Date,
    },
  ],
  unlockedVideos: [
    {
      videoId: String, // e.g. "beginner-footwork"
      unlockedAt: Date,
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.addXP = function (amount: number) {
  this.xp += amount;

  //  leveling formula: xp needed = level * 100
  const requiredXP = this.level * 100;
  if (this.xp >= requiredXP) {
    this.level++;
    this.xp = this.xp - requiredXP; // carry over extra XP
  }
};

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
      // consecutive day
      this.streak++;
    } else {
      // missed a day
      this.streak = 1;
    }
  }

  this.lastLogin = today;
};


// Unlock a punch
userSchema.methods.unlockPunch = function (punchId: string) {
  if (!this.unlockedPunches.find((p: any) => p.punchId === punchId)) {
    this.unlockedPunches.push({ punchId, unlockedAt: new Date() });
  }
};

// Unlock a video
userSchema.methods.unlockVideo = function (videoId: string) {
  if (!this.unlockedVideos.find((v: any) => v.videoId === videoId)) {
    this.unlockedVideos.push({ videoId, unlockedAt: new Date() });
  }
};


const User = mongoose.model("User", userSchema);
export default User;
