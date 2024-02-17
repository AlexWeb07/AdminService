import { createContext } from 'react';

const AdminContext=createContext();

import React from 'react'

function Admin(props) {
  const host="https://admin-service69.vercel.app";

    const createAdmin=async (name,email,password)=>{
       let bodyContent = JSON.stringify({name,email,password});
       let response = await fetch(`${host}/api/admin/createAdmin`, { 
         method: "POST",
         body: bodyContent,
         headers: { "Content-Type": "application/json",
                 adminAuthToken:localStorage.getItem("adminAuthToken") }
       });
       let data = await response.text();
       return data;       
    }
    const adminLogin=async (email,password)=>{
      let bodyContent = JSON.stringify({email,password});
      let response = await fetch(`${host}/api/admin/adminLogin`, { 
        method: "POST",
        body: bodyContent,
        headers: { "Content-Type": "application/json",
            adminAuthToken:localStorage.getItem("adminAuthToken") }
      });
      let data = await response.text();
      return data;  
    }
  return (
    <AdminContext.Provider value={{createAdmin,adminLogin}}>
      {props.children}
    </AdminContext.Provider>
  )
}

export default Admin
