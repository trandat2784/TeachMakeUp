import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import ListProducts from "./pages/ListProducts";
import Order from "./pages/Order";
import Login from "./components/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddPost from "./pages/AddPost";
import ListPosts from "./pages/ListPosts";
import UpdatePost from "./pages/UpdatePost";
import UpdateProduct from "./pages/UpdateProduct";
import ListApproval from "./pages/ListApprovals";
import Check from "./pages/Check";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import  { AdminContextKey } from "./Context/AdminContext";
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";
import Comment from "./pages/Comment";
const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  useEffect(() => {
    localStorage.setItem("token", token);
    console.log("token app",token)
  }, [token]);
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <>
          {/* <Login setToken={setToken} /> */}
          <Routes>
            <Route path="/" element={<Login setToken={setToken} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:id/:token"
              element={<ResetPassword />}
            />
          </Routes>
        </>
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <SideBar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route
                  path="/product/add"
                  element={<AddProduct token={token} />}
                />
                <Route
                  path="/product/list"
                  element={<ListProducts token={token} />}
                />
                <Route path="/orders" element={<Order token={token} />} />
                <Route path="/post/add" element={<AddPost token={token} />} />
                <Route
                  path="/post/list"
                  element={<ListPosts token={token} />}
                />
                <Route
                  path="/post/update/:id"
                  element={<UpdatePost token={token} />}
                />
                <Route
                  path="/product/update/:id"
                  element={<UpdateProduct token={token} />}
                />
                <Route
                  path="/post/approval"
                  element={<ListApproval token={token} />}
                />
                <Route path="/approval/check/:PostId" element={<Check />} />
                <Route
                  path="/post/Comment/:PostId"
                  element={<Comment token={token} />}
                />
                {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
