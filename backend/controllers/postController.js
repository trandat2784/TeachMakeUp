import mongoose from "mongoose";
import postModel from "../models/postModel.js";
import { v2 as cloudinary } from "cloudinary";
const singlePost = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const singlePost = await postModel.find({_id:id});
    res.json({ success: true, singlePost });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const allPost = async (req, res) => {
  try {
    console.log("vao all post");
    const { category } = req.body;
    console.log(category);
    const post = await postModel.find({ category: category });
    res.json({ success: true, post });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const listPostGet = async (req, res) => {
  try {
    console.log("vao list post");
    const posts = await postModel.find({});
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
  }
};
const createPost = async (req, res) => {
  try {
    const { title, description, videoId, category, step,subCategory } = req.body;
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
    const postData = {
      title,
      description,
      videoId,
      category,
      subCategory,
      step: JSON.parse(step),
      image: imageUrl,
    };

    const post = new postModel(postData);
    await post.save();
    res.json({ success: true, message: "post added" });
  } catch (error) {
    console.error(error);
  }
};
const updatePost =async (req, res) => {
  try {
    const { title, description, videoId, category, step,PostId,subCategory } = req.body;
    console.log("say la update post",PostId)
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
    const postData = {
      title,
      description,
      videoId,
      category,
      subCategory,
      step: JSON.parse(step),
      image: imageUrl,
    };

     await postModel.updateOne({ _id: PostId }, postData);
    res.json({ success: true, message: "post updated" });
  } catch (error) {
    console.error(error);
  }
};
const deletePost =async (req, res) => {

  try {
  // const {id}= req.body
  // console.log("id",id)
  await postModel.findByIdAndDelete(req.body.id)
  res.json({success:true,message:"Post deleted"})
} catch (error) {
     console.log(error);
  
}
};
const searchPost = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("id", id);
    const post = await postModel.findById(id);
    console.log("post", post);
    res.json({ success: true, post });
  } catch (error) {
    console.log(error);
  }
};

export { singlePost, allPost, listPostGet, createPost, updatePost, deletePost,searchPost };
