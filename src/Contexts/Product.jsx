import React from 'react'
import ProductContext from './ProductContext';

function Product(props) {
    const host="https://admin-service69.vercel.app";
    const allDemoProducts=async()=>{
        let response = await fetch(`${host}/api/product/getAllDemoProducts`, { 
            method: "GET",
            headers:{"Content-Type": "application/json",
            "adminAuthToken":localStorage.getItem("adminAuthToken"),
            "userAuthToken":localStorage.getItem("userAuthToken")}
        })
        const data= await response.json();
        data.status=response.status;
        return data;
    }
    const allDemoProductsById=async()=>{
        let response = await fetch(`${host}/api/product/getAllDemoProductsById`, { 
            method: "GET",
            headers:{"Content-Type": "application/json",
            "adminAuthToken":localStorage.getItem("adminAuthToken"),
            "userAuthToken":localStorage.getItem("userAuthToken")}
        })
        const data= await response.json();
        data.status=response.status;
        return data;
    }
    const allProducts=async()=>{
        let response = await fetch(`${host}/api/product/getAllProducts`, { 
            method: "GET",
            headers:{"Content-Type": "application/json",
            "adminAuthToken":localStorage.getItem("adminAuthToken"),
            "userAuthToken":localStorage.getItem("userAuthToken")}
        })
        const data= await response.json();
        data.status=response.status;
        return data;
    }
    const addDemoProduct=async (title,desc,img,price,mrp,userId)=>{
        let response = await fetch(`${host}/api/product/addDemoProduct`, { 
          method: "POST",
          body: JSON.stringify({title,desc,img,price,mrp,userId}),
          headers: {"Content-Type": "application/json",
            "adminAuthToken":localStorage.getItem("adminAuthToken"),
            "userAuthToken":localStorage.getItem("userAuthToken")}
        });
        let data = await response.json();
        data.status=response.status;
        return data;  
           

    }
    const acceptProduct=async (id)=>{
        let response = await fetch(`${host}/api/product/accept/${id}`, { 
          method: "PUT",
          headers:{"Content-Type": "application/json",
            "adminAuthToken":localStorage.getItem("adminAuthToken"),
            "userAuthToken":localStorage.getItem("userAuthToken")}
        });
        let data = await response.json();
        data.status=response.status;
        return data;     
    }
    const rejectProduct=async (id)=>{
        let response = await fetch(`${host}/api/product/reject/${id}`, { 
          method: "PUT",
          headers:{"Content-Type": "application/json",
            "adminAuthToken":localStorage.getItem("adminAuthToken"),
            "userAuthToken":localStorage.getItem("userAuthToken")}
        });
        let data = await response.json();
        data.status=response.status;
        return data;    
    }
  return (
    <ProductContext.Provider value={{allDemoProductsById,allProducts,allDemoProducts,addDemoProduct,acceptProduct,rejectProduct}}>
      {props.children}
    </ProductContext.Provider>
  )
}

export default Product
