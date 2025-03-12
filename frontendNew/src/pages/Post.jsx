import React, { useContext, useEffect, useState } from "react";
import SideBar from "../component/SideBar";
import PostItem from "../component/PostItem";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { assets } from "../assets/admin_assets/assets";

const Post = () => {
  const { token } = useContext(ShopContext);
  const [post, setPost] = useState([]);
  const fetchPost = async (categoryItem) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/post/list",
        { category: categoryItem },
        { headers: { token } }
      );
      setPost(response.data.post);
      console.log("data post", response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchPost("hairandnails");
  }, [token]);
  return (
    <div className="flex gap-5">
      <div className="w-[18%] min-h-screen border-r-2">
        <div className="flex flex-col gap-4 pt-6  text-[15px]">
          <div
            className="cursor-pointer flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1"
            onClick={() => fetchPost("hairandnails")}
          >
            <img src={assets.add_icon} alt="" className="w-5 h-5" />
            <p className="hidden md:block">Hair & Nails</p>
          </div>
          <div
            className="cursor-pointer flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1"
            onClick={() => fetchPost("skin")}
          >
            <img src={assets.order_icon} alt="" className="w-5 h-5" />
            <p className="hidden md:block">Skin</p>
          </div>
          <div
            className="cursor-pointer flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1"
            onClick={() => fetchPost("perfume")}
          >
            <img src={assets.order_icon} alt="" className="w-5 h-5" />
            <p className="hidden md:block">Perfume</p>
          </div>
          <div
            className="cursor-pointer flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1"
            onClick={() => fetchPost("outfit")}
          >
            <img src={assets.order_icon} alt="" className="w-5 h-5" />
            <p className="hidden md:block">Outfit</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex-1  ">
        {Array.isArray(post) &&
          post.map((value, index) => (
            <PostItem
              id={value._id}
              img={value.image[0]}
              title={value.title}
              description={value.description}
              key={index}
            />
          ))}
      </div>
    </div>
  );
};

export default Post;
