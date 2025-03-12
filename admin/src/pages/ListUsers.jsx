import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
const ListUser = ({ token }) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000" + "/api/user/list"
      );
      if (response.data.success) {
        setList(response.data.users);
        // console.log(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };
  const removeUser = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/user/remove",
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
      <p className="mb-2">All user list</p>
      <div>
        {/* {list product} */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Name</b>
          <b>Email</b>
          <b className="text-center">Delete</b>
        </div>
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
          >
            <p>{item.name}</p>
            <p>{item.email}</p>

            <p
              className="text-right md:text-center cursor-pointer text-lg"
              onClick={() => {
                removeUser(item._id);
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

export default ListUser;
