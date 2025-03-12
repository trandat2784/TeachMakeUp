import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
const Comment = ({token}) => {
  const { PostId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const handleReply = async (commentId) => {
    try {
      console.log(commentId, replyContent);
      const data = {
        userId: "676e3a473b128f6b2c1d88cb",
        commentId: commentId,
        replyContent: replyContent,
      };
      console.log(data);
      const result = await axios.post(
        "http://localhost:3000/api/comment/reply",
        data,
        
      );
      console.log("Reply result:", result);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                replies: [
                  ...comment.replies,
                  { ...result.data, content: replyContent, userId: userId },
                ],
              }
            : comment
        )
      );
      setReplyContent(""); // Clear input
      toast.success("Phản hồi được thêm thành công!");
    } catch (error) {
      console.error(error);
    }
  };
  const fetchComments = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/comment/list`,
        { PostId }
      );
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) return; // Không gửi bình luận rỗng

    try {
      const response = await axios.post(
        "http://localhost:3000/api/comment/create",
        {
          postId: PostId,
          userId: "676e3a473b128f6b2c1d88cb",
          content: newComment,
        }
        
      );
      console.log(response.data);
      setComments([...comments, response.data]); // Thêm bình luận mới vào danh sách
      fetchComments();
      setNewComment(""); // Reset input
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment.");
    }
  };
  const handleDeleteComment = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/comment/delete",
        { id },
        { headers: { token } }
      );
       if(response.data.success){
        toast.success(response.data.message);
        fetchComments()
       }
    } catch (error) {
      toast.error("Failed to delete comment:", error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="mt-1">
      <form onSubmit={handleCommentSubmit} className="flex flex-col mt-2">
        <textarea
          className="border p-2 rounded-md"
          rows="4"
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit Comment
        </button>
      </form>
      <div className="mt-4">
        {comments.map((comment,index) => (
          <div  key={index} className=" py-2">
            <div className="flex justify-between ">
              <div className="flex flex-col">
                <p className="font-semibold">{comment.userId}</p>
                <p>{comment.content}</p>
              </div>
              <button
                className=" mt-1 mr-2 px-2  text-gray-500 hover:text-white text-md font-medium cursor-pointer bg-gray-200 hover:bg-red-500 rounded-md transition duration-200 shadow-sm"
                onClick={() => handleDeleteComment(comment._id)}
              >
                Delete
              </button>
            </div>
            <div className="mt-3 ml-6 flex gap-2">
              <input
                type="text"
                placeholder="Write a reply..."
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <button
                onClick={() => handleReply(comment._id)}
                className="bg-blue-500 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-600"
              >
                Reply
              </button>
            </div>
            <div className="ml-6 mt-2">
              {comment.replies?.map((reply, index) => (
                <div
                  key={index}
                  className="py-2 border-l-2 border-gray-200 pl-4 mb-2 bg-gray-50 rounded"
                >
                  <p className="font-medium text-gray-700">{reply.userId}</p>
                  <p className="text-gray-600">{reply.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
