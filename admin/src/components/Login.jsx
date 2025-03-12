import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../../src/App";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Login = ({setToken}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(email, password);
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });
      console.log(response);
      if (response.data.success) {
        setToken(response.data.token);
        console.log(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login admin</h1>
        <form action="" onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72 ">
            <p className="text-sm font-medium text-gra-700 mb-2  ">Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              type="text"
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
            />
          </div>
          <div className="mb-3 min-w-72 ">
            <p className="text-sm font-medium text-gra-700 mb-2  ">password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              value={password}
              type="text"
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
          >
            Log in
          </button>
          <div>
            <Link to={"/forgot-password"}>
              <p className=" cursor-pointer">Forgot your password?</p>
            </Link>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Login;
