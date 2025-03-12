import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { assets } from "../../../frontend/src/assets/frontend_assets/assets";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [visibleSearch, setVisibleSearch] = useState(true);
  const [searchData, setSearchData] = useState("");
  const searchProduct =async()=>{
    try {
      console.log("gtrui tim kiem",searchData)
      const response = await axios.post(backendUrl + "/api/product/search",{id:searchData});
      if (response.data.success) {
      const newArr= [response.data.product];
        setList(newArr);
        console.log(response.data.product)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  }
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
        
        // console.log(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
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
  useEffect(()=>{
        console.log("list",list);

  },[list])
  return (
    <div>
      <div className="flex justify-between ">
        <p className="mb-2">All product list</p>
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
      </div>
      <div>
        {/* {list product} */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b className="text-center">Update</b>
          <b className="text-center">Delete</b>
        </div>
        {list.length
          ? list.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
              >
                <img src={item.image[0]} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>

                <Link to={`/product/update/${item._id}`}>
                  <p className="text-right p-1  bg-main-color md:text-center cursor-pointer text-lg">
                    Update
                  </p>
                </Link>
                <p
                  className="text-right md:text-center cursor-pointer text-lg"
                  onClick={() => {
                    removeProduct(item._id);
                  }}
                >
                  X
                </p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default List;
