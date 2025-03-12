import React, { useContext } from 'react'
import {assets} from "../assets/assets.js"
import { AdminContextKey } from '../Context/AdminContext.jsx'
const Navbar = ({setToken}) => {
  const {navigate} = useContext(AdminContextKey)
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
      <button onClick={()=>{setToken(""); navigate("/")} } className='bg-gray-600 text-white px-5 py-2 sm:py-2 rounded-full text-xs  sm:text-sm'>Log out</button>
    </div>
  )
}

export default Navbar
