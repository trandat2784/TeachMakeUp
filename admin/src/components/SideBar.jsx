import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
const SideBar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1"
          to="/product/add"
        >
          <img src={assets.add_icon} alt="" className="w-5 h-5" />
          <p className="hidden md:block">Add product</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1"
          to="/product/list"
        >
          <img src={assets.order_icon} alt="" className="w-5 h-5" />
          <p className="hidden md:block">List products</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1"
          to="/post/add"
        >
          <img src={assets.add_icon} alt="" className="w-5 h-5" />
          <p className="hidden md:block">Add post</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1"
          to="/post/list"
        >
          <img src={assets.order_icon} alt="" className="w-5 h-5" />
          <p className="hidden md:block">List posts</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1"
          to="/post/approval"
        >
          <img src={assets.order_icon} alt="" className="w-5 h-5" />
          <p className="hidden md:block">By user</p>
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar
