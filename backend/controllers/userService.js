import { UserModel } from "../models/user.js";

export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    await UserModel.findOne({ email: email }).then((user) => {
      if (user) {
        if (user.password == password) {
          res.status(201).json({
            data: user,
            message: "Login successfully",
          });
        } else {
          res.status(401).json({
            message: "Your password doesn't match",
          });
        }
      } else {
        res.status(401).json({
          message: "I can't find your email",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const signUpUser = async (req, res) => {
  const { email, password, username, role } = req.body;
  req.body["name"] = req.body["username"];
  await UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.username == username) {
        res.status(401).json({
          message: "Username has been existed",
        });
      } else if (user.password != password) {
        res.status(401).json({
          message: "Your password doesn't match",
        });
      } else {
        res.status(401).json({
          message: "Email has been existed",
        });
      }
    } else {
      const user = new UserModel(req.body);
      user.save();
      res.json({
        status: 200,
        data: user,
        message: "Sign up successfully",
      });
    }
  });
};

