import mongoose from "mongoose";
import postModel from "../models/postModel.js";
import { v2 as cloudinary } from "cloudinary";
import reviewModel from "../models/reviewModel.js";

const listReviewUser = async (req, res) => {
  try {
    console.log("vao list review");
    const { author } = req.body;
    console.log(author);
    const reviews = await reviewModel.find({ author });
    res.json({ success: true, reviews });
  } catch (error) {
    console.log(error);
  }
};
const singleReview = async (req, res) => {
   try {
     console.log("vao single review");
     const { PostId } = req.body;
     console.log("postid",PostId);
     const review = await reviewModel.findById(PostId);
     console.log(review);
     res.json({ success: true, review });
   } catch (error) {
     console.log(error);
   }
}
const listApproval = async (req, res) => {
  try {
    const reviews = await reviewModel.find({ });
    res.json({ success: true, reviews });
  } catch (error) {
    console.log(error);
  }
};
const allowPostUser = async (req, res) => 
{
  try {
    const reviewData = await reviewModel.findById(req.body.id);
     const  {
       title,
       description,
       videoId,
       category,
       subCategory,
       author,
       step,
       image,
     } = reviewData;
     const postCommit = new postModel({
       title,
       description,
       videoId,
       category,
       subCategory,
       author,
       step: typeof step === "string" ? JSON.parse(step) : step, // Xử lý step nếu là chuỗi
       image,
     });
     await postCommit.save();
    await reviewModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message:" Post was approval"});
  } catch (error) {
    console.log(error);
    
  }
}
const createReview = async (req, res) => {
  try {
    const { title, description, videoId, category, step, subCategory, author } =
      req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter(
      (item) => item != undefined
    );
    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    const reviewData = {
      title,
      description,
      videoId,
      category,
      subCategory,
      author,
      step: JSON.parse(step),
      image: imageUrl,
    };

    const review = new reviewModel(reviewData);
    await review.save();
    res.json({ success: true, message: "Post is waiting commit by admin" });
  } catch (error) {
    console.error(error);
  }
};
const deleteReview = async (req, res) => {
  try {
    // const {id}= req.body
    // console.log("id",id)
    await reviewModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Your post was deleted" });
  } catch (error) {
    console.log(error);
  }
};

export { listReviewUser, createReview, deleteReview, listApproval,allowPostUser,singleReview };
