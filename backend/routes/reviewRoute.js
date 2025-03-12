import express from "express";
import { listReviewUser,createReview,deleteReview, listApproval, allowPostUser ,singleReview} from "../controllers/reviewController.js";
import adminAuth from "../middleware/adminAuth.js";
import upLoad from "../middleware/multer.js";
import authUser from "../middleware/auth.js";
const reviewRouter = express.Router();
reviewRouter.post("/list", listReviewUser);
reviewRouter.post("/single",singleReview);
reviewRouter.post("/approval", listApproval);
reviewRouter.post("/allow",adminAuth ,allowPostUser);

reviewRouter.post(
  "/create",
  authUser,
  upLoad.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  createReview
);
reviewRouter.post("/delete", authUser, deleteReview);
reviewRouter.post("/delete-admin", authUser, deleteReview);




export default reviewRouter;
