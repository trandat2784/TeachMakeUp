import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import RelatedProducts from "../component/RelatedProducts";
import { assets } from "../assets/frontend_assets/assets";

const ReadPost = () => {
  const { PostId } = useParams();
  const { token, posts, userId } = useContext(ShopContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [currentState, setCurrentState] =useState("step");
  const [postData, setPostData] = useState(false);
  const [star, setStar] = useState(false);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubcategory] = useState("");

  const handleReply = async (commentId) => {
    try {
      console.log(commentId,replyContent,userId)
          const data = {
            userId: userId,
            commentId: commentId,
            replyContent: replyContent
          };
          console.log(data)
      const result = await axios.post(
        "http://localhost:3000/api/comment/reply",
         data ,
        { headers: { token } },
      );
      console.log("Reply result:", result);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                replies: [
                  ...comment.replies,
                  { ...result.data, content: replyContent ,userId: userId},
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
  const updateFavourite = async () => {
    try {
      if (star) {
        const data = {
          UserId: userId,
          PostId: PostId,
        };
        console.log(data);
        const response = await axios.post(
          "http://localhost:3000/api/user/favourite/update",
          data
        );
        toast.success("Add post into list favourite");
       
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPostData = async () => {
    console.log("Fetching post data", postData);
    await posts.find((item) => {
      if (item._id === PostId) {
        setPostData(item);
        setImage(item.image[0]);
        setCategory(item.category||"Unknown");
        setSubcategory(item.subCategory || "Unknown");
        return null;
      }
    });
  };
  const fetchComments = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/comment/list`,{PostId}
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
          userId,
          content: newComment,
        },
        { headers: { token } }
      );
      setComments([...comments, response.data]); // Thêm bình luận mới vào danh sách
      fetchComments()
      setNewComment(""); // Reset input
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment.");
    }
  };
  useEffect(() => {
    if (postData) {
      setCategory(postData.category || "Unknown");
      setSubcategory(postData.subCategory || "Unknown");
      console.log(postData.category,postData.subCategory)
    }
  }, [postData]);
  useEffect(() => {
    if (posts && posts.length > 0) {
      fetchPostData();
    }
    console.log("found category post", postData.category);
  }, [PostId, posts]);
  useEffect(() => {
    console.log("Post data updated:", postData);
    setCategory(postData.category);
    setSubcategory(postData.subCategory);
    console.log("Post data updated:", category);
  }, [postData]);
  useEffect(() => {fetchComments()},[])
  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* content 1 */}
      <div className="flex gap-6 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse  sm:flex-row">
          <div className="w-full sm:w-[80%]">
            <img
              className="min-w-400  min-h-450px object-cover"
              src={image}
              alt=""
            />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{postData.title}</h1>
          <div className=" flex items-center gap-1 mt-2">
            {star ? (
              <img
                src={assets.star_icon}
                alt=""
                className="w-5 "
                onClick={() => {
                  updateFavourite();
                  setStar(true);
                }}
              />
            ) : (
              <img
                src={assets.star_dull_icon}
                alt=""
                className="w-5 "
                onClick={() => {
                  setStar(true);
                }}
              />
            )}
          </div>

          <p className="mt-5 text-gray-500 md:w-4/5">{postData.description}</p>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original content designed for makeup enthusiasts.</p>
            <p>
              Learn step-by-step techniques to enhance your skills and create
              stunning looks.
            </p>
          </div>
        </div>
      </div>
      {/* content 2 */}
      <div className="mt-20 w-full">
        <iframe
          className="w-full"
          height="500"
          src={`https://www.youtube.com/embed/${postData.videoId}?start=37057`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="mt-20">
        <div className="flex">
          <b
            className="border px-5 py-3 text-sm cursor-pointer"
            onClick={() => {
              setCurrentState("step");
            }}
          >
            Step to do
          </b>
          <b
            className="border px-5 py-3 text-sm cursor-pointer"
            onClick={() => {
              setCurrentState("comment");
            }}
          >
            Comment
          </b>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm">
          {currentState === "step"
            ? postData.step?.map((step, index) => {
                return (
                  <div key={index}>
                    <b className="text-black-100">Step {index + 1}</b>
                    <p>{step}</p>
                  </div>
                );
              })
            : null}
          {currentState === "comment" ? (
            //comment here
            <div className="mt-1">
              <form
                onSubmit={handleCommentSubmit}
                className="flex flex-col mt-2"
              >
                <textarea
                  className="border p-2 rounded-md"
                  rows="4"
                  placeholder="Write your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  type="submit"
                  className="mt-2 bg-blue-500 text-white py-2 px-4  hover:bg-blue-600 transition duration-200"
                >
                  Submit Comment
                </button>
              </form>
              <div className="mt-4">
                {comments.map((comment) => (
                  <div key={comment._id} className=" py-2">
                    <p className="font-semibold">{comment.userId}</p>
                    <p>{comment.content}</p>
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
                          className="py-2 border-l-2 border-main-color pl-4 mb-2 bg-gray-50 rounded"
                        >
                          <p className="font-medium text-gray-700">
                            {reply.userId}
                          </p>
                          <p className="text-gray-600">{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    
      {category === "" && subCategory === "" ? null : (
        <RelatedProducts category={subCategory} subCategory={category} />
      )}
    </div>
  );
};

export default ReadPost;
