import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    showSearch,
    setShowSearch,
    getCartCount,
    token,
    setToken,
    setUserId,
    navigate,
    setCartItem,
  } = useContext(ShopContext);
  const logOut = () => {
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUserId("");
    setToken("");

    setCartItem({});
  };
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to={"/"}>
        {" "}
        <img src={assets.logo} alt="" className="w-36" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? "border-b-2 border-gray-700" : ""
            }`
          }
        >
          <p>Home</p>
          <hr className=" border-none h-[1.5px] bg-gray-700" />
        </NavLink>
        <NavLink
          to="/collection"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? "border-b-2 border-gray-700" : ""
            }`
          }
        >
          <p>COLLECTION</p>
          <hr className="border-none h-[1.5px] bg-gray-700" />
        </NavLink>
        <NavLink
          to="/post"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? "border-b-2 border-gray-700" : ""
            }`
          }
        >
          <p>POST</p>
          <hr className=" border-none h-[1.5px] bg-gray-700" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        {/* <img
          onClick={() => setShowSearch((prev) => !prev)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt=""
        /> */}
        <div className="group relative">
          <Link to={"/Login"}>
            <img
              src={assets.profile_icon}
              className="w-5 cursor-pointer "
              alt=""
            />
          </Link>
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            {!token ? null : (
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p
                  onClick={() => navigate("/Favourites")}
                  className="cursor-pointer hover:text-black "
                >
                  Favourites
                </p>
                <p
                  onClick={() => navigate("/Up-post")}
                  className="cursor-pointer hover:text-black "
                >
                  Up post
                </p>
                <p
                  onClick={() => logOut()}
                  className="cursor-pointer hover:text-black "
                >
                  Log out
                </p>
              </div>
            )}
          </div>
        </div>
        {/* <Link to="/cart" className="relative">
          <img alt="" src={assets.cart_icon} className="w-5 min-w-5" />
          <p className="absolute right-[5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] ">
            {getCartCount()}
          </p>
        </Link> */}
        <img
          src={assets.menu_icon}
          onClick={() => setVisible(true)}
          className="sm:hidden w-5 cursor-pointer"
          alt=""
        />
      </div>
      <div
        className={` absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>BACK</p>
          </div>
          <NavLink
            to={"/"}
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
          >
            HOME
          </NavLink>
          <NavLink
            to={"/collection"}
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
          >
            COLLECTION
          </NavLink>
          <NavLink
            to={"/about"}
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
          >
            ABOUT
          </NavLink>
          <NavLink
            to={"/contact"}
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
