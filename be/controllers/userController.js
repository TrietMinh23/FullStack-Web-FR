import { User } from "../models/userModel.js";
import { generateToken, decodeToken } from "../config/jwtToken.js";
import bcrypt from "bcryptjs";

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
    return;
  } else {
    console.log("Access token is valid");
    User.find({ _id: decoded_token.id })
      .populate("wishlist")
      .then((user) => {
        console.log(user);
        let arr = [];
        async function populateWishlist() {
          for (const item of user[0].wishlist) {
            let temp = {
              _id: item._id,
              title: item.title,
              description: item.description,
              price: item.price,
              brandName: item.brandName,
              category: item.category,
              image: item.image,
              color: item.color,
              sellerId: item.sellerId,
            };
            const sellerInfo = await item.populate("sellerId");
            temp.nameSeller = sellerInfo.sellerId.name;
            temp.email_seller = sellerInfo.sellerId.email;
            arr.push(temp);
          }
        }
        populateWishlist().then(() => {
          const selectedData = {
            address: user[0].address,
            email: user[0].email,
            mobile: user[0].mobile,
            name: user[0].name,
            role: user[0].role,
            list: arr,
            _id: user[0]._id,
          };
          res.status(200).json(selectedData);
          return;
        });
      });
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

export const deleteProductFromListUser = async (req, res) => {
  const { userId, productId } = req.body;
  await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { wishlist: productId } },
    { new: true }
  );
  res.status(200).json({ message: "Remove the product successfully" });
};

export const updateUserWishList = async (req, res) => {
  const { id, userId } = req.body;
  try {
    // Kiểm tra xem người dùng muốn thêm cartItem vào listWish
    if (id !== undefined) {
      console.log("User want to add new item to data");
      const user = await User.findById(userId.replace(/^"(.*)"$/, "$1"));
      user.wishlist.push(id);
      await user.save(); // Lưu lại thông tin người dùng sau khi cập nhật
      let arr = [];
      user
        .populate("wishlist")
        .then((user) => {
          for (let i of user.wishlist) {
            arr.push(i);
          }
          res
            .status(200)
            .json({ status: "OK", message: "Cập nhật thành công.", list: arr });
          return;
        })
        .catch((err) => console.log(err));
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra." });
  }
};

export const updateInformation = async (req, res) => {
  const { userId, address, phone, name } = req.body;

  console.log(phone);

  try {
    const user = await User.findOne({ _id: userId });

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

      if (findUser.role === "admin") {
        res.status(403).json({ message: "Your account doesn't exist" });
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
