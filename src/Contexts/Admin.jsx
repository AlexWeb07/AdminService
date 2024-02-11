import { createContext } from 'react';

const AdminContext=createContext();

import React from 'react'

function Admin(props) {
    let headersList = { "Content-Type": "application/json" }

    const createAdmin=async (name,email,password)=>{
       let bodyContent = JSON.stringify({name,email,password});
       let response = await fetch("http://localhost:4000/api/admin/createAdmin", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       let data = await response.text();
       return data;       
    }
    const adminLogin=async (email,password)=>{
      let bodyContent = JSON.stringify({email,password});
      let response = await fetch("http://localhost:4000/api/admin/adminLogin", { 
        method: "POST",
        body: bodyContent,
        headers: headersList
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
