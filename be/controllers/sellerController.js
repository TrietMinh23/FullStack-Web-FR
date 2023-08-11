import { Seller } from "../models/sellerModel.js";
import { Cart } from "../models/cartModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwtToken.js";

export const getSellers = async (req, res) => {
  try {
    const sellers = await Seller.find({ role: "seller" });
    res.status(200).json(sellers);
  } catch (err) {
    res.status(400).json({ error: err.messange });
  }
};

export const createSeller = async (req, res) => {
  try {
    const email = req.body.email;
    const findSeller = await Seller.findOne({ email });

    if (findSeller) {
      console.log(findSeller);
      return res.status(400).json({ error: "Seller already exists" });
    }

    const newSeller = new Seller(req.body);
    await newSeller.save();

    const accessToken = generateToken(newSeller._id, "1d");
    const refreshtoken = generateToken(`${newSeller._id}fr`, "3d");
    // const refreshtoken = await generateToken(newUser._id);
    res.status(201).json({
      status: "OK",
      access_token: accessToken,
      refresh_token: refreshtoken,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.messange });
  }
};

export const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findSeller = await Seller.find({ email });
    if (!findSeller) {
      return res.status(404).json({ error: "Seller doesn't exist" });
    }

    const passwordMatched = await bcrypt.compare(password, findSeller.password);
    if (!passwordMatched) {
      return res.status(400).json({ error: "Password doesn't match" });
    }

    // generate access token
    const accessToken = await generateToken(findSeller._id);

    // generate refresh token
    const refreshToken = await generateToken(findSeller._id);
    const updateUser = await Seller.findByIdAndUpdate(
      findSeller._id,
      { refreshToken: refreshToken },
      { new: true }
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
    res.status(400).json({ error: err.messange });
  }
};

export const logoutSeller = async (req, res) => {
  try {
    const cookie = req.cookie;
    if (!cookie.refreshToken) {
      res.status(400).json({ message: "No refresh token in cookie" });
    }

    const refreshToken = cookie.refreshToken;
    const seller = await Seller.findOneAndUpdate({
      refreshToken: refreshToken,
    });
    if (!seller) {
      return res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
    } else {
      await Seller.findOneAndUpdate(seller._id, { refreshToken: null });
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
    }

    res.status(200).json({ message: "Logout successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
