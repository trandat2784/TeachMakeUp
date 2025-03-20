import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";


const MyPost = () => {
  const [myPost, setMyPost] = useState([]);
  const {userId,token}= useContext(ShopContext);
  const fetchMyPosts=async() => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/review/list",
          { author:localStorage.getItem("userId") }
        );
        console.log(response.data)
        if (response.data.success) {
          setMyPost(response.data.reviews);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
  }
  const deletePost = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/review/delete",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchMyPosts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };
  useEffect(()=>{
    console.log(userId);
    fetchMyPosts();
  },[])
  return (
    <div className="flex gap-5">
      <div className="w-[18%] min-h-screen border-r-2">
        <div className="flex flex-col gap-4 pt-6  text-[15px]">
          <Link to={"/Up-post"}>
            <div className="cursor-pointer flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1">
              <img src={assets.order_icon} alt="" className="w-5 h-5" />
              <p className="hidden md:block">Up post</p>
            </div>
          </Link>
          <Link to={"/My-post"}>
            <div className="cursor-pointer flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1">
              <img src={assets.order_icon} alt="" className="w-5 h-5" />
              <p className="hidden md:block">List post</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="w-full">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          {/* <b className="text-center">Update</b> */}
          <b className="text-center">Delete</b>
        </div>
        {myPost?.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
          >
            <img
              className="max-h-[120px] min-w-[120px] object-cover"
              src={item.image[0]}
              alt=""
            />
            <p>{item.title}</p>
            <p>{item.category}</p>

            <p
              className="text-right md:text-center cursor-pointer text-lg"
              onClick={() => {
                deletePost(item._id);
              }}
            >
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPost;
