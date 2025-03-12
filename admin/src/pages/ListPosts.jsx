import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { assets } from "../../../frontend/src/assets/frontend_assets/assets";

const ListPosts = ({ token }) => {
  const [list, setList] = useState([]);
  const [visibleSearch, setVisibleSearch] = useState(true);
  const [searchData, setSearchData] = useState("");
  const searchProduct = async () => {
    try {
      console.log("gtrui tim kiem", searchData);
      const response = await axios.post(backendUrl + "/api/post/search", {
        id: searchData,
      });
      if (response.data.success) {
        const newArr = [response.data.post];
        setList(newArr);
        console.log(response.data.post);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/post/list");
      if (response.data.success) {
        setList(response.data.posts);
        // console.log(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };
  const deletePost = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/post/delete",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div>
      <div className="flex justify-between ">
        <p className="mb-2">All posts list</p>
        <img
          src={assets.search_icon}
          onClick={() => setVisibleSearch((prev) => !prev)}
          className="sm:hidde w-4 h-4 cursor-pointer m-r-5 "
          alt=""
        />
      </div>
      <div>
        {visibleSearch ? (
          <div className="border-t border-b bg-gray-50 text-center">
            <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
              <input
                className="flex-1 outline-none border-none bg-inherit text-sm"
                type="text"
                placeholder="Search"
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
              />
              <img
                className="w-4"
                src={assets.search_icon}
                onClick={() => searchProduct()}
                alt=""
              />
            </div>
            <img
              onClick={() => setVisibleSearch(false)}
              className="inline w-3 cursor-pointer"
              src={assets.cross_icon}
              alt=""
            />
          </div>
        ) : null}
        {/* {list product} */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b className="text-center">Comments</b>
          <b className="text-center">Update</b>
          <b className="text-center">Delete</b>
        </div>
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
          >
            <img
              className="max-h-[120px] min-w-[120px] object-cover"
              src={item.image[0]}
              alt=""
            />
            <p>{item.title}</p>
            <p>{item.category}</p>
            <p className="text-right p-1  bg-main-color md:text-center cursor-pointer text-lg">
              <Link to={`/post/comment/${item._id}`}>Comments</Link>
            </p>
            <p className="text-right p-1  bg-main-color md:text-center cursor-pointer text-lg">
              <Link to={`/post/update/${item._id}`}>Update</Link>
            </p>
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

export default ListPosts;
