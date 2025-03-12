import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const adminAuth = async(req, res, next) => {
  try {
    const { token } = req.headers;
    console.log("post admin",token)
    if (!token) {
      return res.json({
        success: false,
        message: "Not authorization login again ",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("admin auth2",token_decode)
    const email = token_decode.slice(0, process.env.ADMIN_EMAIL.length); 
    console.log(token_decode.email);
    const user =await userModel.findOne({email})
    console.log(user);
    if(!user){
      return res.json({
        success: false,
        message: "Not authorization login again ",
      });
    }
    
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
