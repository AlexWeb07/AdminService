

import React from 'react'

function User(props) {
    let headersList = { "Content-Type": "application/json" }

    const createUser=async (name,email,password)=>{
       let bodyContent = JSON.stringify({name,email,password});
       let response = await fetch("http://localhost:4000/api/user/createUser", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       let data = await response.json();
       return data;       
    }
    const userLogin=async (email,password)=>{
      let bodyContent = JSON.stringify({email,password});
      let response = await fetch("http://localhost:4000/api/user/userLogin", { 
        method: "POST",
        body: bodyContent,
        headers: headersList
      });
      let data = await response.json();
      return data;  
    }
    const allUser= async ()=>{
      const res= fetch()
    }
  return (
    <UserContext.Provider value={{createUser,userLogin}}>
      {props.children}
    </UserContext.Provider>
  )
}

export default User
