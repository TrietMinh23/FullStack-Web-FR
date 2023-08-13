import { User } from "../models/userModel.js";
import { Cart } from "../models/cartModel.js";
import { generateToken, decodeToken } from "../config/jwtToken.js";
import bcrypt from "bcryptjs";
import "dotenv/config";

//Complete REFRESH TOKEN HANDLE
export const refreshTokenHandle = async (req, res) => {
  const requestToken = req.headers.refresh_token;
  const decoded_token = decodeToken(requestToken);
  const refresh_token = decoded_token.id.slice(0, -2);
  User.find({ _id: refresh_token }).then((user) => {
    if (user) {
      const accessToken = generateToken(user._id, "1d");
      res.status(200).json({ access_token: accessToken });
    }
  });
};

//Complete Get User Information
export const getUserInformation = async (req, res) => {
  const { authorization } = req.headers;
  const decoded_token = decodeToken(authorization);
  const currentTimestamp = Math.floor(Date.now() / 1000);
  try {
    if (currentTimestamp > decoded_token.exp) {
      console.log("Access token has expired");
      res.status(400).json({
        error: "true",
        message: "Unauthorized access",
        err: {
          name: "TokenExpiredError",
          message: "jwt expired",
          expiredAt: decoded_token.exp,
        },
      });
      return;
    } else {
      console.log("Access token is valid");
      User.findById(decoded_token.id).then(async (user) => {
        const selectField = {
          _id: user._id,
          name: user.name,
          address: user.address,
          role: user.role,
          mobile: user.mobile,
          email: user.email,
        };

        if (user.role === "buyer") {
          const cart = await Cart.find({ userId: user._id });
          if (cart[0]) {
            selectField["cart"] = {
              products: cart[0].products,
              total_price: cart[0].totalPrice,
              _id: cart[0]._id,
              first: true,
            };
          } else {
            selectField["cart"] = {
              products: [],
              total_price: 0,
              _id: null,
              first: true,
            };
          }
        }
        res.status(200).json(selectField);
      });
    }
  } catch {
    res.status(400).json({ message: "Invalid Access" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "buyer" });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateInformation = async (req, res) => {
  const { userId, address, phone, name } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.mobile = phone;
    user.address = address;
    user.name = name; // Add this line if you want to update the user's name as well

    await user.save();

    return res
      .status(200)
      .json({ message: "User information updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

//Complete Sign Up
export const createUser = async (req, res) => {
  try {
    const email = req.body.email;
    const findUser = await User.findOne({ email });

    if (findUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const newUser = new User(req.body);
    if (newUser.role === "buyer") {
      const newCart = new Cart({ userId: newUser._id });
      await newCart.save();
    }

    const accessToken = generateToken(newUser._id, "1d");
    const refreshtoken = generateToken(`${newUser._id}fr`, "3d");

    await newUser.save();

    return res.status(200).json({
      status: "OK",
      access_token: accessToken,
      refresh_token: refreshtoken,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Complete Log In
export const loginUser = async (req, res) => {
  try {
    const { email, password, role, otp } = req.body;
    console.log(otp);

    if (!otp && role === "admin") {
      res.status(403).json({ message: "Your account doesn't exist" });
      return;
    }

    if (
      otp &&
      otp !== process.env.KEYOTPADMIN &&
      (role !== "admin" || role === "admin")
    ) {
      res.status(403).json({ message: "Your account doesn't exist" });
      return;
    }

    const findUser = await User.findOne({ email });

    if (findUser) {
      const passwordMatch = await bcrypt.compare(password, findUser.password);

      if (!passwordMatch) {
        res.status(400).json({ message: "Password doesn't match" });
        return;
      }

      if (findUser?.isBlocked) {
        res.status(403).json({ message: "Your account has been blocked!" });
        return;
      }

      if (findUser) {
        if (findUser.role !== role) {
          res.status(400).json({ message: "Your role doesn't match" });
          return;
        }
      }

      const accessToken = generateToken(findUser._id, "1d");
      const refreshtoken = generateToken(`${findUser._id}fr`, "3d");

      res.status(200).json({
        status: "OK",
        access_token: accessToken,
        refresh_token: refreshtoken,
      });
      return;
    } else {
      res.status(404).json({ message: "Your account doesn't exist" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const cookie = req.cookies;
    if (!cookie.refreshToken) {
      res.status(400).json({ message: "No refresh token in cookie" });
      return;
    }

    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken: refreshToken });
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return;
    } else {
      await User.findByIdAndUpdate(user._id, { refreshToken: null });
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

export const deleteUser = async (req, res) => {
  console.log(req.user._id);
  try {
    const id = req.query.id;
    if (id !== req.user._id) {
      res.status(403).json({ error: "You are not authorized to delete!" });
      return;
    }
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(200).json({ message: "Delete user successfully!" }, user);
      return;
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err);
  }
};

export const blockUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    await user.save();
    res.status(200).json({ message: "Block user successfully!", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const unblockUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    await user.save();
    res.status(200).json({ message: "Unblock user successfully!", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateUserCart = async (req, res) => {
  const { cartId, productId } = req.body;
  try {
    console.log("User want to add new item to data");

    const cartUser = await Cart.findById({ _id: cartId });

    if (cartUser) {
      const newProduct = {
        product: productId,
        quantity: 1,
      };

      cartUser.products.push(newProduct);

      await cartUser.save();
    }

    res.status(200).json({ status: "OK", message: "Update successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sorry, there is something wrong." });
  }
};

export const deleteProductFromListUser = async (req, res) => {
  const { cartId, productId } = req.body;

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { _id: cartId },
      { $pull: { products: { product: productId } } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res
      .status(200)
      .json({ message: "Removed the product successfully", updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
