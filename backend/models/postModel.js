import express from "express";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  videoId: { required: true, type: String },
  title: { required: true, type: String },
  subCategory: { type: String },
  category: { required: true, type: String },
  image: { required: true, type: Array },
  description: { required: true, type: String },
  step: { required: true, type: Array },
  favourite: { type: Number, default: 0 },
});
const postModel = mongoose.models.post || mongoose.model("post", postSchema);
export default postModel;
