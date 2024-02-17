import React, { useContext, useEffect, useState } from 'react'
import MyModal from '../component/MyModal';
import ProductContext from '../Contexts/ProductContext';
import Loader from '../component/Loader';
import { useNavigate } from 'react-router-dom';

function UserPage() {
  const navigate=useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem("userAuthToken")){
      alert("Please login first with valid id and password..")
      navigate("/");
    }
  },[])
  const [open,setOpen]=useState(false)
  const [openMS,setOpenMS]=useState(false)
  const [loader,setLoader]=useState(true)

  // Contexts
  const productContext=useContext(ProductContext)
  const {addDemoProduct,allDemoProductsById}=productContext


  
  // Add Product
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
    }  
    else
    setProduct({...product,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const {title,desc,img,mrp,price} =product
    const data=await addDemoProduct(title,desc,img,mrp,price)
    if(data.submitedProduct){
      setProduct({title:"",desc:"",img:"",mrp:"",price:""})
    }
    alert(data.msg);
  }


  // User Submitted Product
  const [mySubmit,setMySubmit]=useState([])
  const showMySubmit=async ()=>{
      setOpenMS(true)
      setLoader(true)
      const data=await allDemoProductsById();
      if(data.status==401)
      {
        alert(data.msg);
        setOpenMS(false)
        setLoader(false)
      }
      else{
        setMySubmit(data.DemoProducts)
        setLoader(false)
      }
  }



  // Input Box Style(Tailwind Css) 
  const inputStyle='w-[80%] h-10 bg-transparent border border placeholder:text-teal-800 pl-3 border-slate-900 rounded'


  // return statement
  return (
    <>

      {/* Actual What showing first to the user */}
      <div className="flex justify-center items-center gap-10 absolute left-0 top-16 w-full h-[calc(100%-4rem)] bg-slate-500/50 text-xl">
        <button onClick={()=>setOpen(true)} className='flex justify-center items-center w-60 h-14 font-bold text-teal-600 rounded-xl bg-slate-200'>Add Product</button>
        <button onClick={showMySubmit} className='flex justify-center items-center w-60 h-14 font-bold text-teal-600 rounded-xl bg-slate-200'>My Submissions</button>
      </div> 

      {/* Add Product */}
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
         <input type="file" id='imgSel' name='img' className={`${inputStyle} hidden`} placeholder='Select Image' onChange={handleChange}/>
         <input type="number" name='mrp' value={product.mrp} className={inputStyle} placeholder='Enter MRP' onChange={handleChange}/>
         <input type="number" name='price' value={product.price} className={inputStyle} placeholder='Enter Price' onChange={handleChange}/>
         <input type="submit" value="Submit" className='w-[45%] h-12 bg-slate-800 rounded-3xl text-slate-100'/>
        </form>
      </MyModal>
      
      {/* User Submitted Product */}
      <MyModal setOpen={setOpenMS} open={openMS} width="w-[60%]" bg="bg-slate-600">
      {loader?<Loader />:mySubmit.length!=0? 
        <table className="w-full h-auto bg-slate-600">
          <thead className="text-lg border-b text-gray-100 uppercase">
              <tr>
                  <th scope="col" className="px-6 py-3">
                      Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                      MRP
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Result
                  </th>
              </tr>
          </thead>
          <tbody className='text-slate-100 h-auto'>
            {mySubmit.map((p)=>{
              return  <tr className="border-b border-slate-400" key={p._id}>
                  <td className="px-6 py-3 font-medium text-center">
                    {p.title}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {p.desc}
                  </td>
                  <td className="px-2 py-1 items-center flex justify-center">
                    <img src={p.img} alt="" className='w-20 h-16' />
                  </td>
                  <td className="px-6 py-3 text-center">
                    {p.price}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {p.mrp}
                  </td>
                  <td className="text-center w-44 border-l">
                    {p.accepted==99?
                      <h2 className='text-teal-400'>In Queue</h2>
                        :p.accepted==1?
                          <h2 className='text-blue-400'>Accepted</h2>
                            :<h2 className='text-red-400'>Rejected</h2>}
                  </td>
              </tr>})}
          </tbody>
        </table>:<h1 className='w-full h-[88%] text-2xl text-teal-200 font-medium flex justify-center items-center'>You haven't submitted anything yet</h1>}
      </MyModal>

    </>
  )
}

export default UserPage
