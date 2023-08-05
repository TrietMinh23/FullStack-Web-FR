import { User } from "../models/userModel.js";
import { generateToken, decodeToken } from "../config/jwtToken.js";
import bcrypt from "bcryptjs";

export const refreshTokenHandle = async (req, res) => {
  const decoded_token = decodeToken(req.headers.refresh_token);
  const refresh_token = decoded_token.id.slice(0, -2);
  User.find({ _id: refresh_token }).then((user) => {
    if (user) {
      const accessToken = generateToken(user._id, "1d");
      res.status(200).json({ access_token: accessToken });
    }
  });
};

export const getUserInformation = async (req, res) => {
  const decoded_token = decodeToken(req.headers.authorization);
  const currentTimestamp = Math.floor(Date.now() / 1000);
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
  } else {
    console.log("Access token is valid");
    User.find({ _id: decoded_token.id }).then((user) => {
      const selectedData = {
        address: user[0].address,
        email: user[0].email,
        mobile: user[0].mobile,
        name: user[0].name,
        role: user[0].role,
        list: user[0].wishlist,
        _id: user[0]._id,
      };
      res.status(200).json(selectedData);
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "buyer" });
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { cartItem, userId } = req.body;

  try {
    // Kiểm tra xem người dùng muốn thêm cartItem vào listWish
    if (cartItem !== undefined) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { listWish: cartItem } },
        { new: true } // Trả về bản ghi sau khi cập nhật
      );
      res
        .status(200)
        .json({ message: "Cập nhật thành công.", user: updatedUser });
    } else {
      res.status(400).json({ message: "Không có thông tin cần cập nhật." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra." });
  }
};

export const createUser = async (req, res) => {
  try {
    const email = req.body.email;
    const findUser = await User.findOne({ email });

    if (findUser) {
      res.status(400).json({ message: "Buyer already exists" });
      return;
    }

    req.body["mobile"] = `__MOBILE_NULL_FOR_${req.body.email}_`;
    const newUser = new User(req.body);

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

export const loginUser = async (req, res) => {
  try {
    const { email, password, role, otp } = req.body;
    if (otp) {
      const findUser = await User.findOne({ email });
      if (findUser) {
        const passwordMatch = await bcrypt.compare(password, findUser.password);

        if (!passwordMatch) {
          res.status(400).json({ message: "Password doesn't match" });
          return;
        }

        if (otp !== "123456") {
          res.status(400).json({ message: "Wrong OTP" });
          return;
        }

        const accessToken = generateToken(findUser._id, "1d");
        const refreshtoken = generateToken(`${findUser._id}fr`, "3d");

        // const updateUser = await User.findByIdAndUpdate(
        //   findUser?._id,
        //   { refreshToken: refreshToken },
        //   { new: true }
        // );
        // res.cookie("refreshToken", refreshToken, {
        //   httpOnly: true,
        //   maxAge: 72 * 60 * 60 * 1000,
        // });

        // return token

        res.status(200).json({
          status: "OK",
          access_token: accessToken,
          refresh_token: refreshtoken,
        });
        return;
      } else {
        res.status(404).json({ message: "Buyer doesn't exist" });
      }
    } else {
      // check if user exists or not
      const findUser = await User.findOne({ email });

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

      if (findUser) {
        const passwordMatch = await bcrypt.compare(password, findUser.password);

        if (!passwordMatch) {
          res.status(400).json({ message: "Password doesn't match" });
          return;
        }

        const accessToken = generateToken(findUser._id, "1d");
        const refreshtoken = generateToken(`${findUser._id}fr`, "3d");

        // const updateUser = await User.findByIdAndUpdate(
        //   findUser?._id,
        //   { refreshToken: refreshToken },
        //   { new: true }
        // );
        // res.cookie("refreshToken", refreshToken, {
        //   httpOnly: true,
        //   maxAge: 72 * 60 * 60 * 1000,
        // });

        // return token

        res.status(200).json({
          status: "OK",
          access_token: accessToken,
          refresh_token: refreshtoken,
        });
        return;
      } else {
        res.status(404).json({ message: "Buyer doesn't exist" });
      }
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
