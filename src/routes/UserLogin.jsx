import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function UserLogin() {
  const navigate=useNavigate()
  const [user, setUser] = useState({ email: "", password: "" })
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/user/userLogin", { 
        method: "POST",
        body: JSON.stringify({email:user.email,password:user.password}),
        headers: {
          "Content-Type":"application/json"
        }
    });
    const json=await res.json();
    if(json.login){
      localStorage.setItem("userAuthToken",json.authToken)
      localStorage.removeItem("adminAuthToken")
      console.log(json.msg)
      navigate("/user")
    }
    else{
      console.log(json.msg)
    }
}
  return (
    <div className='absolute left-0 top-16 w-full h-[calc(100%-4rem)] flex justify-center flex-row items-center bg-slate-500/50'>
      <div className='h-[20rem] w-[25rem] bg-slate-300 flex flex-col justify-start items-center rounded-md'>
        <h1 className='mt-5 text-3xl font-bold text-teal-600'>User Login</h1>
        <form onSubmit={handleSubmit} className='h-[80%] w-full flex flex-col justify-evenly items-center'>

            <input type="text" id='email' name='email' placeholder="User Email" className=" placeholder-teal-600 font-semibold outline-none border-slate-600 border w-[calc(100%-6rem)] pl-3 rounded h-10 bg-transparent" onChange={handleChange}/>
            <input type="password" className=" placeholder-teal-600 font-semibold outline-none border-slate-600 border w-[calc(100%-6rem)] pl-3 rounded h-10 bg-transparent" id="pass" placeholder="Password" name='password' onChange={handleChange}/>
            
          <button type="submit" className="w-40 h-10 bg-slate-500 text-slate-50 rounded-lg">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default UserLogin
