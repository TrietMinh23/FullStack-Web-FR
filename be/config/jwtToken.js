// generating JWT
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const generateToken = (id, dayLive) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: dayLive });
};

const decodeToken = (accessToken) => {
  return jwt.verify(accessToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      return err;
    } else {
      return decoded;
    }
  });
};

export { generateToken, decodeToken };
