import express from "express";
import mongoose from "mongoose";
const replySchema = new mongoose.Schema({
  userId: { required: true, type: String },
  content: { required: true, type: String },
 
});
const commentSchema = new mongoose.Schema({
  postId: { required: true, type: String },
  userId: { required: true, type: String },
  content: { required: true, type: String },
  replies: { type: [replySchema],default:[] },
});
const commentModel = mongoose.models.comment || mongoose.model("comment", commentSchema);
export default commentModel;
