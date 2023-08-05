import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const verifyAccessToken = asyncHandler(async (req, res, next) => {
  if (req?.headers?.authorization?.startsWith('Bearer')) { // if the authorization header exists and starts with Bearer
    const token = req.headers.authorization.split(' ')[1]; // split the token from the Bearer
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({
        success: false,
        mes: 'Invalid access token'
      })
      req.user = decoded;
      next();
    })
  }
  else {
    return res.status(401).json({
      success: false,
      mes: 'Require authentication!'
    })
  }
});

const verifyToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];// Extract the token part from the header
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }
      req.user = user; //attach user info to req object
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
});

const verifyTokenAndAuthorization = asyncHandler(async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id = req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  })
});


const verifyAdmin = asyncHandler(async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
});

export { verifyAccessToken, verifyToken, verifyTokenAndAuthorization, verifyAdmin};