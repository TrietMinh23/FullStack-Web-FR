import jwt from "jsonwebtoken";

export const authenticationUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decode;
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
