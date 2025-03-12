import commentModel from "../models/commentModel.js";

const listComment = async (req, res) => {
  try {
    const { PostId } = req.body;
    console.log(PostId)
    const comments = await commentModel.find({ postId: PostId });
    console.log(comments);
    res.json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ message: "Error find comment", error });
  }
};
const createComment = async (req, res) => {
  try {
    const { postId, content,userId } = req.body;
    console.log("create comment",userId)
    const newComment = new commentModel({ postId, userId, content });
    await newComment.save();
    res.status(201).json({ success: true, newComment });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};

const replyComment = async (req, res) => {  
  try {
    const {userId, commentId, replyContent } = req.body;
    console.log("comment id",commentId);
    console.log("comment id", replyContent);
    const content=replyContent 
    // const userId = req.user.id; // Lấy userId từ middleware authUser
    const comment = await commentModel.findById(commentId);
    console.log("comment",comment)
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    console.log("reply",comment.replies)
    comment.replies.push({ userId, content });
    await comment.save();
    res.status(200).json({ success: true, comment,message:"reply success" });
  } catch (error) {
    res.status(500).json({ message: "Error adding reply", error });
  }
};
const deleteComment = async (req, res) => {
  try {
    const {id}= req.body
    console.log("deleteComment",id)
    await commentModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Comment deleted" });
  } catch (error) {
    console.log(error)
  }
}
export { replyComment, createComment ,listComment, deleteComment};
