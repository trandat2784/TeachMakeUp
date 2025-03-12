import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
const AdminContext = (props) => {
  const [products, setProducts] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()
  const [token,setToken]=useState("");
  const getProductsData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/product/list"
      );

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getPostsData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/post/list");
      if (response.data.success) {
        console.log("day la list post 2", response.data.posts);
        setPosts(response.data.posts);
        console.log("posts", posts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getProductsData();
    getPostsData();
  }, []);
 
  const value = { posts, products, navigate };
  return (
    <AdminContextKey.Provider value={value}>
      {props.children}
    </AdminContextKey.Provider>
  );
};

export const AdminContextKey = createContext();
export default AdminContext;
