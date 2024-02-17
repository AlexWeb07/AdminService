import React from 'react'
import UserContext from './UserContext';

function User(props) {
    const host="https://admin-service69.vercel.app";
    const createUser=async (name,email,password)=>{
       let bodyContent = JSON.stringify({name,email,password});
       let response = await fetch(`${host}/api/user/createUser`, { 
         method: "POST",
         body: bodyContent,
         headers: {"Content-Type": "application/json",
            "adminAuthToken":localStorage.getItem("adminAuthToken"),
            "userAuthToken":localStorage.getItem("userAuthToken")}
       });
       let data = await response.json();
       data.status=response.status;
       return data;       
    }
    const userLogin=async (email,password)=>{
      let bodyContent = JSON.stringify({email,password});
      let response = await fetch("${host}/api/user/userLogin", { 
        method: "POST",
        body: bodyContent,
        headers: {"Content-Type": "application/json",
            "adminAuthToken":localStorage.getItem("adminAuthToken"),
            "userAuthToken":localStorage.getItem("userAuthToken")}
      });
      let data = await response.json();
      data.status=response.status;
      return data;  
    }
    const allUser= async ()=>{
      const res= await fetch(`${host}/api/user/getAllUser`,{
        method:"GET",
        headers: {"Content-Type": "application/json",
            "adminAuthToken":localStorage.getItem("adminAuthToken"),
            "userAuthToken":localStorage.getItem("userAuthToken")}
      })
      const data =await res.json();
      data.status=res.status;
      return data;
    }
    const updateUser=async (name,email,password,id)=>{
      let bodyContent = JSON.stringify({name,email,password});
      let response = await fetch(`${host}/api/user/updateUser/${id}`, { 
        method: "PUT",
        body: bodyContent,
        headers: {"Content-Type": "application/json",
            "adminAuthToken":localStorage.getItem("adminAuthToken"),
            "userAuthToken":localStorage.getItem("userAuthToken")}
      });
      let data = await response.json();
      data.status=response.status;
      return data;       
   }
   const deleteUser=async(id)=>{
    let response = await fetch(`${host}/api/user/deleteUser/${id}`, { 
        method: "DELETE",
        headers: {"Content-Type": "application/json",
            "adminAuthToken":localStorage.getItem("adminAuthToken"),
            "userAuthToken":localStorage.getItem("userAuthToken")}
      });
      let data=response.json();
      data.status=response.status;
      return data;
   }
  return (
    <UserContext.Provider value={{createUser,userLogin, allUser,updateUser,deleteUser}}>
      {props.children}
    </UserContext.Provider>
  )
}

export default User
