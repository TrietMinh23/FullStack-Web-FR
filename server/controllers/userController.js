import {User} from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({error: err.message});
  }
};

export const createUser = async (req, res) => {
  try {
    const {email} = req.body.email;
    const findUser = await User.findOne({email});

    if (!findUser) {
      const newUser = new User.create(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } else {
      res.status(400).json({message: "User already exists"});
    }
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

export const getUserByName = async (req, res) => {
  try {
    const name = req.params.name;
    const user = await User.find({name});

    if (user.length === 0) {
      return res.status(404).json({error: "User not found!"});
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({error: err.message});
  }
};

export const deleteUserByName = async (req, res) => {
  try {
    const name = req.params.name;
    const delUser = await User.findOneAndDelete({name});
    if (!delUser) {
      res.status(404).json({error: "Post doesn't exist!"});
      return;
    }
    console.log("The post has been successfully deleted");
    res.status(204).json({message: "The post has been successfully deleted"});
  } catch (err) {
    res.status(404).json({error: err.message});
  }
};

// export const loginUser = async (req, res) => {
//   try {
//     const {email, password} = req.params.body;
    
//     // check if user exists or not
//     const findUser = await User.findOne({email});
//     if (findUser) {
//       const userPass = await User.findOne({password});
//       if (userPass) {
//         res.status(200).json({message: "Login successed"});
//       } else {
//         res.status(400).json({error: "Password doesn't match"});
//       }
//     } else {
//       res.status(400).json({error: "User doesn't exist"});
//     }
//   } catch (err) {
//     res.status(400).json({error: err.message});
//   }
// };

// export const logoutUser = async (req, res) => {
//   try {
//   } catch (err) {
//     res.status(400).json({error: err.message});
//   }
// };
