import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  // console.log(navigator.geolocation.getCurrentPosition((position)=>{
  //   if(navigator.permissions)
  //   {
  //     var lat=position.coords.latitude
  //     var lon=position.coords.longitude
  //     console.log(lat,lon);
  //   }
  // }))
  return (
    <div className='absolute top-16 left-0 h-[calc(100%-4rem)] w-full bg-slate-500/50 flex justify-center items-center gap-10 font-mono text-2xl'>
          <Link to="/adminLogin" className='flex justify-center items-center w-60 h-14 font-bold text-teal-600 rounded-xl bg-slate-100'>Login as Admin</Link>
          <Link to="/userLogin" className='flex justify-center items-center w-60 h-14 font-bold text-teal-600 rounded-xl bg-slate-100'>Login as User</Link>
    </div>
  )
}

export default Home
