import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
const PostItem = ({ id,img, title, description,removeFavourite  }) => {
  return (
    <Link className="text-gray-700 cursor-pointer " to={`/ReadPost/${id}`}>
      <div className="border-2 grid lg:grid-cols-[1fr_3fr]  gap-4 p-4 mb-2">
        <img
          className="w-[190px] h-[185px] object-cover"
          src={img || assets.about_img}
          alt=""
        />
        <div>
          <h1 className="m-0 text-xl font-bold">{title}</h1>
          <h2>{description}</h2>
        </div>
        {
          removeFavourite &&(
        <button className="bg-red-500 text-white font-semibold py-2 px-4  hover:bg-red-600 transition duration-200" onClick={removeFavourite(id)}>
          Remove
        </button>

          )
        }
      </div>
    </Link>
  );
};

export default PostItem;
