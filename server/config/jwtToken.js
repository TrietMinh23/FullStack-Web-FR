// generating JWT
import jwt from "jsonwebtoken";

// expiresIn: "1d": hết hạn sau 1 ngày
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
};

export{ generateToken };
