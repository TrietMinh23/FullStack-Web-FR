import mongoose from "mongoose";

const User = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: null,
  },
  mobile: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model("User", User);
