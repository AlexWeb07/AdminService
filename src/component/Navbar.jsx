import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const adminId=localStorage.getItem("adminAuthToken")
  const userId=localStorage.getItem("adminAuthToken")
  return (
    <div className="absolute top-0 left-0 flex justify-start items-center w-full h-16 bg-slate-700 text-zinc-100">
      <Link className="header font-mono font-bold text-2xl ml-2 mr-6" to="/">{(!adminId?"Data Entry":"Admin Panel") || (!userId?"Data Entry":"Admin Panel")}</Link>
      <div className="nav-items flex items-center justify-start w-[50%] gap-5 text-lg font-sans">
        <Link className='' to='/'>Home</Link>    
        <Link className='' to='/userlogin'>User Login</Link>
        <Link className='' to='/user'>User Panel</Link>
        <Link className='' to='/adminlogin'>Admin Login</Link>
        <Link className='' to='/admin'>Admin Panel</Link>    
      </div>
  </div>
  )
}

export default Navbar
