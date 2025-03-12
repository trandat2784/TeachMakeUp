import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import axios from "axios";
import { Link } from "react-router-dom";
const ListApproval = ({ token }) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.post(backendUrl + "/api/review/approval");
      if (response.data.success) {
        setList(response.data.reviews);
        // console.log(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };
  const deleteApproval = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/review/delete",
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
  const allowPost = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/review/allow",
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
      <p className="mb-2">All approval list</p>
      <div>
        {/* {list product} */}
        <div className="hidden md:grid grid-cols-[2fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b className="text-center">Check</b>
          <b className="text-center">Delete</b>
          <b className="text-center">Allow</b>
        </div>
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[2fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
          >
            <img
              className="max-h-[120px] min-w-[120px] object-cover"
              src={item.image[0]}
              alt=""
            />
            <p>{item.title}</p>
            <p>{item.category}</p>
            <p className="text-right p-1 rounded-xl bg-green-100 md:text-center cursor-pointer text-lg">
              <Link to={`/approval/check/${item._id}`}>Check</Link>
            </p>
            <p
              className="text-right md:text-center cursor-pointer text-lg"
              onClick={() => {
                deleteApproval(item._id);
              }}
            >
              X
            </p>
            <p
              className="text-right md:text-center cursor-pointer text-lg"
              onClick={() => {
                allowPost(item._id);
              }}
            >
              V
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListApproval;
