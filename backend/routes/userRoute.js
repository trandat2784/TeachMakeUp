import express from "express";
import {
  loginUser,
  adminLogin,
  registerUser,
  updateFavourite,
  listFavourite,
  removeFavourite,
  forgotPassword,
  listUsers,
  removeUser,
  resetPassword,
  forgotPasswordAdmin,
  
 
} from "../controllers/userController.js";
import authUser from "../middleware/auth.js";
const userRouter = express.Router()
userRouter.post("/register",registerUser);
userRouter.post("/list", listUsers);
userRouter.post("/remove", removeUser);
userRouter.post("/favourite/update", updateFavourite);
userRouter.post("/favourite/list", listFavourite);
userRouter.post("/favourite/remove", removeFavourite);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/forgot-password-admin", forgotPasswordAdmin);
userRouter.post("/reset-password", resetPassword);
userRouter.post("/admin", adminLogin);
export default userRouter;
 