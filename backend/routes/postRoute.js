import express from "express";
import {
  singlePost,
  allPost,
  listPostGet,
  createPost,
  updatePost,
  deletePost,
  searchPost,
} from "../controllers/postController.js";
import adminAuth from "../middleware/adminAuth.js";
import upLoad from "../middleware/multer.js";
import authUser from "../middleware/auth.js";
const postRouter = express.Router();
postRouter.get("/list",listPostGet)
postRouter.post("/single",authUser,singlePost);
postRouter.post("/list", allPost);
postRouter.post("/search",  searchPost);
postRouter.post(
  "/create",
  adminAuth,
  upLoad.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  createPost
);
postRouter.post(
  "/update",
  adminAuth,
  upLoad.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  updatePost
);
postRouter.post("/delete", adminAuth, deletePost);

export default postRouter;
