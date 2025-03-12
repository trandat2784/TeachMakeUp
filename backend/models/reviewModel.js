import express from "express";
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  videoId: { required: true, type: String },
  author: {  type: String },
  title: { required: true, type: String },
  subCategory: { type: String },
  category: { required: true, type: String },
  image: { required: true, type: Array },
  description: { required: true, type: String },
  step: { required: true, type: Array },
});
const reviewModel = mongoose.models.review || mongoose.model("review", reviewSchema);
export default reviewModel;
