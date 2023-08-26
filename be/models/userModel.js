import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, default: "" },
    mobile: { type: String, default: "" },
    role: { type: String, default: "buyer" },
    isBlocked: { type: Boolean, default: false },
    // wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

userSchema.methods.isAdmin = async function () {
  return this.role === "admin";
};

//Dat
userSchema.methods.createPasswordChangedToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex'); // generate a random string
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex'); // hash the resetToken and save it to the database
  this.passwordResetExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
  return resetToken;
};

export const User = mongoose.model("User", userSchema);
