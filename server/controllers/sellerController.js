import {Seller} from "../models/sellerModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {generateToken} from "../config/jwtToken.js";

export const getSellers = async (req, res) => {
  try {
    const sellers = await Seller.find({role: "seller"});
    res.status(200).json(sellers);
  } catch (err) {
    res.status(400).json({error: err.messange});
  }
};

export const createSeller = async (req, res) => {
  try {
    if (req.params.role !== "seller") {
      res
        .status(403)
        .json({error: "You are not authorized to create this seller!"});
    }

    const email = req.body.email;
    const findSeller = await Seller.find({email});

    if (findSeller) {
      res.status(404).json({error: "Seller doesn't exist!"});
    }

    const newSeller = new Seller.create(req.body);
    await newSeller.save();

    const accessToken = await generateToken(newSeller._id);
    // const refreshtoken = await generateToken(newUser._id);
    res.status(201).json({
      _id: findSeller?._id,
      name: findSeller?.name,
      email: findSeller?._email,
      mobile: findSeller?.mobile,
      token: accessToken,
    });
  } catch (err) {
    res.status(400).json({error: err.messange});
  }
};

export const loginSeller = async (req, res) => {
  try {
    if (req.params.role !== "seller") {
      res.status(403).json({error: "You are not authorized to login!"});
    }

    const {email, password} = req.body;

    const findSeller = await Seller.find({email});
    if (!findSeller) {
      res.status(404).json({error: "Seller doesn't exist"});
    }

    const passwordMatched = await bcrypt.compare(password, findSeller.password);
    if (!passwordMatched) {
      res.status(400).json({error: "Password doesn't match"});
    }

    // generate access token
    const accessToken = jwt.sign(
      {id: findSeller._id, role: "seller"},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "1d"}
    );

    // generate refresh token
    const refreshToken = await generateToken(findSeller._id);
    const updateUser = await Seller.findByIdAndUpdate(
      findSeller._id,
      {refreshToken: refreshToken},
      {new: true}
    );

    // cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    res.status(200).json({
      _id: findSeller._id,
      name: findSeller.name,
      email: findSeller.email,
      mobile: findSeller.mobile,
      token: accessToken,
    });


  } catch (err) {
    res.status(400).json({error: err.messange});
  }
};

export const logoutSeller = async (req, res) => {
  try {
    if (req.params.role !== "Seller") {
      res.status(403).json({error: "You are not authorized to logout!"});
    }

    const cookie = req.cookie;
    if(!cookie.refreshToken) {
      res.status(400).json({message: "No refresh token in cookie"});
    }
    
    const refreshToken = cookie.refreshToken;
    const seller = await Seller.findOneAndUpdate({refreshToken : refreshToken});
    if (!seller) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
    } else {
      await Seller.findOneAndUpdate(seller._id, {refreshToken: null});
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
    }
    
    res.status(200).json({message: "Logout successfully!"});
  } catch (err) {
    res.status(400).json({error: err.message});
  }
}