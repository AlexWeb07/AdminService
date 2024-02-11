import React, { useEffect, useRef, useState } from 'react'
import MyModal from '../component/MyModal';

function UserPage() {
  const [open,setOpen]=useState(false)
  
  const maxWidth = 800; // Set your desired maximum width
const maxHeight = 600;
  const convertToBase64 = (file) => {
   return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let width = img.width;
        let height = img.height;

        // Resize the image if it exceeds maxWidth or maxHeight
        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;

          if (width > maxWidth) {
            width = maxWidth;
            height = width / aspectRatio;
          }

          if (height > maxHeight) {
            height = maxHeight;
            width = height * aspectRatio;
          }
        }

        // Set canvas dimensions to the resized image size
        canvas.width = width;
        canvas.height = height;

        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Get the resized data URL from the canvas
        const resizedDataURL = canvas.toDataURL("image/jpeg"); // Adjust format as needed

        resolve(resizedDataURL);
      };

      img.src = fileReader.result;
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
  };

  const [product,setProduct]=useState({title:"",desc:"",img:"",mrp:"",price:""})
  const handleChange=async (e)=>{
    if(e.target.name=="img"){
      const base64=await convertToBase64(e.target.files[0])
      setProduct({...product,"img":base64})
      // console.log(base64);
      // setProduct({...product,"img":URL.createObjectURL(e.target.files[0])})
    }  
    else
    setProduct({...product,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/product/addDemoProduct", { 
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type":"application/json"
        }
    });
    const json=await res.json();
    console.log(json);
  }

  const inputStyle='w-[80%] h-10 bg-transparent border border placeholder:text-teal-800 pl-3 border-slate-900 rounded'
  return (
     <>

      <div className="flex justify-center items-center gap-10 absolute left-0 top-16 w-full h-[calc(100%-4rem)] bg-slate-500/50 text-xl">
        <button onClick={()=>setOpen(true)} className='flex justify-center items-center w-60 h-14 font-bold text-teal-600 rounded-xl bg-slate-200'>Add Product</button>
        <button className='flex justify-center items-center w-60 h-14 font-bold text-teal-600 rounded-xl bg-slate-200'>My Submissions</button>
     </div> 

     <MyModal open={open} setOpen={setOpen} bg="bg-slate-200" width="w-[30%]">

       <form onSubmit={handleSubmit} className='flex flex-col items-center justify-start gap-9 w-full h-auto bg-slate-200'>
         <h1 className='text-3xl font-bold text-teal-600'>Add a product</h1>
         <input type="text" name='title' value={product.title} className={inputStyle} placeholder='Product Title' onChange={handleChange}/>
         <input type="text" name='desc' value={product.desc} className={inputStyle} placeholder='Product Description' onChange={handleChange}/>

         {product.img ? 
          <div className='flex justify-evenly items-center w-full'>
            <img src={product.img} className='w-20 h-20' alt="Uploaded image" />
            <button className='px-2 h-8 rounded-full bg-teal-500 text-white hover:bg-red-500' onClick={()=>{setProduct({...product,img:""})}}>
             Unselect ⨉
            </button>
          </div>:
          <label htmlFor="imgSel" className={`${inputStyle} flex items-center text-teal-800`}>
            Click to Select an Image
          </label>}

         {/* {product.img && <img src={product.img} className='w-10 h-10' alt="Uploaded image" />} */}

         <input type="file" id='imgSel' name='img' className={`${inputStyle} hidden`} placeholder='Select Image' onChange={handleChange}/>
         <input type="number" name='mrp' value={product.mrp} className={inputStyle} placeholder='Enter MRP' onChange={handleChange}/>
         <input type="number" name='price' value={product.price} className={inputStyle} placeholder='Enter Price' onChange={handleChange}/>
         <input type="submit" value="Submit" className='w-[45%] h-12 bg-slate-800 rounded-2xl text-slate-100'/>
       </form>

       </MyModal>
     </>
  )
}

export default UserPage
