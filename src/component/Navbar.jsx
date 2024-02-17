import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";
function Navbar() {
  const location=useLocation();
  const navigate=useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("adminAuthToken"))
      navigate('/admin')
    else if(localStorage.getItem("userAuthToken"))
      navigate('/user')
  },[])
 
  
  const handleAdminLogout=()=>{
    localStorage.removeItem("adminAuthToken")
    navigate('/');
  }
  const handleUserLogout=()=>{
    localStorage.removeItem("userAuthToken")
    navigate('/');
  }
  return (
    <div className="absolute top-0 left-0 flex justify-between items-center w-full h-16 bg-slate-700 text-zinc-100">
      <div className="nav-items flex items-center justify-start w-auto gap-5 text-lg font-sans">
        <Link className="header font-mono font-bold text-3xl ml-2" to={location.pathname}>
          {location.pathname=='/admin'? "Admin Panel" : location.pathname=='/user'? "User Panel":"Data Entry"}
        </Link>
        <Link className='text-2xl' to={(location.pathname== "/admin" || location.pathname=="/user")?location.pathname: "/"}>Home</Link>    
      </div>
      <div className=' w-auto h-full flex justify-center items-center mr-5 font-semibold text-xl'>
      { location.pathname=="/admin"
          && <button className=' bg-teal-400/50 px-4 py-2 rounded-3xl hover:bg-red-400 text-2xl' onClick={handleAdminLogout}><IoIosLogOut/></button> }
      { location.pathname=="/user"
          && <button className=' bg-teal-400/50 px-4 py-2 rounded-3xl hover:bg-red-400 text-2xl' onClick={handleUserLogout}><IoIosLogOut/></button> }
      </div>
  </div>
  )
}

export default Navbar
