import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {type: String, require: true},
    email: {type: String, require: true},
    mobile: {type: String, unique: true},
    password: {type: String, require: true},
    address: {type: String},
    role: {type: String, default: "client"},
    isBlocked: {type: Boolean, default: false},
    wishlist: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
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
    next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createPasswordResetToken = async function () {
 
}

export const User = mongoose.model("User", userSchema);
