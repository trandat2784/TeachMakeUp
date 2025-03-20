import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import Title from "../component/Title";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const Favourites = () => {
  const { token, userId, posts } = useContext(ShopContext);
  const [favourite, setFavourite] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const fetchPost = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/favourite/list",
        { userId },
        { headers: { token } }
      );
      setFavourite(response.data.favourite);

      console.log("data favourite", response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const removeFavourite = async (postId) => {
    try {
      console.log("remove favourite", postId);
      const response = await axios.post(
        "http://localhost:3000/api/user/favourite/remove",
        { userId, postId }
      );
      console.log("asda")
      setFavourite(response.data.favourites);
      fetchPost()
    } catch (error) {
      console.error("Error removing favourite:", error);
    }
  };
  useEffect(() => {
    fetchPost();
  }, [userId, token]);

  return (
    <div className="flex gap-5">
      {/* <div className="w-[18%] min-h-screen border-r-2">
        <div className="flex flex-col gap-4 pt-6  text-[15px]">
          <div
            className="cursor-pointer flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1"
            // onClick={() => fetchPost("hairandnails")}
          >
            <img src={assets.add_icon} alt="" className="w-5 h-5" />
            <p className="hidden md:block">Hair & Nails</p>
          </div>
          <div
            className="cursor-pointer flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1"
            // onClick={() => fetchPost("skin")}
          >
            <img src={assets.order_icon} alt="" className="w-5 h-5" />
            <p className="hidden md:block">Skin</p>
          </div>
          <div className="cursor-pointer flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1">
            <img src={assets.order_icon} alt="" className="w-5 h-5" />
            <p className="hidden md:block">Perfume</p>
          </div>
          <div className="cursor-pointer flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1">
            <img src={assets.order_icon} alt="" className="w-5 h-5" />
            <p className="hidden md:block">Outfit</p>
          </div>
        </div>
      </div> */}
      <div className="mt-4 flex-1  ">
        <div className="text-2xl">
          <Title text1={"MY"} text2={" FAVOURITES"} />
        </div>
        {Array.isArray(favourite) &&
          favourite.length > 0 &&
          favourite.map((favId) => {
            const post = posts.find((value) => value._id === favId);
            if (post) {
              return (
                <div
                  key={post._id}
                  className="border-2 grid lg:grid-cols-[1fr_3fr] gap-4 p-4 mb-2"
                >
                  <Link
                    className="text-gray-700 cursor-pointer"
                    to={`/ReadPost/${post._id}`}
                  >
                    <img
                      className="w-[190px] h-[185px] object-cover"
                      src={post.image[0] || assets.about_img}
                      alt=""
                    />
                  </Link>
                  <div>
                    <h1 className="m-0 text-xl font-bold">{post.title}</h1>
                    <h2>{post.description}</h2>
                  </div>
                  <button
                    className="bg-red-500 text-white font-semibold py-2 px-4 hover:bg-red-600 transition duration-200"
                    onClick={() => removeFavourite(post._id)}
                  >
                    Remove
                  </button>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Favourites;
