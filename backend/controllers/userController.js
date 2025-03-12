import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({ success: false, message: "user already registered" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Pls enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Password too weak" });
    }
    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    console.log(user._id);
    res.json({ success: true, token, userId: user._id.toString() });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user dosen't exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password); 
    if (isMatch && user.role===0) {
      const token = createToken(user._id);
      console.log(user._id.toString());
      res.json({ success: true, token, userId: user._id.toString() });
    } else {
      res.json({ success: false, message: "Invalid credential" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user dosen't exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password); 

    if (
      // email === process.env.ADMIN_EMAIL &&
      // password === process.env.ADMIN_PASSWORD
     isMatch && user.role===1

    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credential" });
    }
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

const updateFavourite = async (req, res) => {
  try {
    const { UserId, PostId } = req.body;
    console.log(UserId, PostId);
    await userModel.updateOne(
      { _id: UserId, favourite: { $ne: PostId } },
      { $push: { favourite: PostId } }
    );
    res.json({ success: true, message: "Update post in favorites" });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};
const listFavourite = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("userid", userId);
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const favourite = user.favourite;
    console.log("favourite", favourite);
    res.json({ success: true, favourite });
  } catch (error) {}
};
const removeFavourite = async (req, res) => {
  try {
    console.log("remove fv");
    const { userId, postId } = req.body;
    console.log(userId);
    console.log(postId);
    const user = await userModel.findById(userId);
    console.log("user", user);
    user.favourite = user.favourite.filter((id) => id.toString() !== postId);
    await user.save();
    console.log(postId);
    console.log(user.favourites);
    res.status(200).json({
      message: "Post removed from favourites",
      favourites: user.favourites,
    });
  } catch (error) {
    res.status(500).json({ message: "Error removing post", error });
  }
};
const listUsers = async (req, res) => {
  try {
    console.log("vao list user");
    const users = await userModel.find({});
    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
  }
};
const removeUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "User deleted" });
  } catch (error) {
    console.log(error);
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const oldUser = await userModel.findOne({ email });
    if (!oldUser) {
      return res.json({ success: false, message: "User Not Exists!!" });
    }
    // const secret = process.env.JWT_SECRET + oldUser.password;
    const token = createToken(oldUser._id);
    const link = `http://localhost:3001/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.ethereal.email",
      port: 465,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: "subnauticaearly@gmail.com",
        pass: "hrhy nyxo kzvy csho",
      },
    });

    var mailOptions = {
      from: "subnauticaearly@gmail.com",
      to: oldUser.email,
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
    return res.json({ success: true, message: "Password reset link sent." });
  } catch (error) {}
};
const resetPassword = async (req, res) => {
  try {
    const { id, token, newPassword } = req.body;
    console.log("newpass",newPassword);
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid or expired token." });
      }

      // Find the user by ID
      const user = await userModel.findById(id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found." });
      }

      // Check if the user ID matches the token
      if (decoded.id !== id) {
        return res
          .status(403)
          .json({ success: false, message: "Unauthorized action." });
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      // Update the user's password
      user.password = hashedPassword;
      console.log("hash passs",user.password)
      await user.save();

      res.json({ success: true, message: "Password reset successfully." });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const forgotPasswordAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const oldUser = await userModel.findOne({ email });
    if (!oldUser) {
      return res.json({ success: false, message: "User Not Exists!!" });
    }
    // const secret = process.env.JWT_SECRET + oldUser.password;
    const token = createToken(oldUser._id);
    const link = `http://localhost:5173/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.ethereal.email",
      port: 465,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: "subnauticaearly@gmail.com",
        pass: "hrhy nyxo kzvy csho",
      },
    });

    var mailOptions = {
      from: "subnauticaearly@gmail.com",
      to: "subnauticaearly@gmail.com",
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
    return res.json({ success: true, message: "Password reset link sent." });
  } catch (error) {}
};
export {
  loginUser,
  registerUser,
  adminLogin,
  updateFavourite,
  listFavourite,
  removeFavourite,
  listUsers,
  removeUser,
  forgotPassword,
  forgotPasswordAdmin,
  resetPassword,
};
