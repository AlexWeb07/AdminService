import React from 'react'
import ProductContext from './ProductContext';

function Product(props) {

    let headersList = {"Content-Type": "application/json"}

    const allDemoProducts=async()=>{
        let response = await fetch("http://localhost:4000/api/product/getAllDemoProducts", { 
            method: "GET"
        })
        const data= await response.json();
        return data;
    }
    const allDemoProductsByUserid=async(userId)=>{
        let response = await fetch(`http://localhost:4000/api/product/getAllDemoProducts/${userId}`, { 
            method: "GET"
        })
        const data= await response.json();
        return data;
    }
    const allProducts=async()=>{
        let response = await fetch("http://localhost:4000/api/product/getAllProducts", { 
            method: "GET"
        })
        const data= await response.json();
        return data;
    }
    const addDemoProduct=async (title,desc,img,price,mrp,userId)=>{
        let response = await fetch("http://localhost:4000/api/product/addDemoProduct", { 
          method: "POST",
          body: JSON.stringify({title,desc,img,price,mrp,userId}),
          headers: headersList
        });
        let data = await response.json();
        return data;  
           

    }
    const acceptProduct=async (id)=>{
        let response = await fetch(`http://localhost:4000/api/product/accept/${id}`, { 
          method: "PUT"
        });
        let data = await response.json();
        return data;     
    }
    const rejectProduct=async (id)=>{
        let response = await fetch(`http://localhost:4000/api/product/reject/${id}`, { 
          method: "PUT",
        });
        let data = await response.json();
        return data;    
    }
  return (
    <ProductContext.Provider value={{allDemoProductsByUserid,allProducts,allDemoProducts,addDemoProduct,acceptProduct,rejectProduct}}>
      {props.children}
    </ProductContext.Provider>
  )
}

export default Product
