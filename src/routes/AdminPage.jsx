import React, { useState,useContext } from 'react'
import MyModal from '../component/MyModal'
import ProductContext from '../Contexts/ProductContext'
import Loader from '../component/Loader'

function AdminPage() {
  const [openNU,setOpenNU]=useState(false)
  const [openUL,setOpenUL]=useState(false)
  const [openPS,setOpenPS]=useState(false)
  const [openPA,setOpenPA]=useState(false)

  // product Context
  const productContext=useContext(ProductContext)
  const {allDemoProducts,acceptProduct,rejectProduct, allProducts}=productContext

  // Product Submitted
  const [demoProduct,setDemoProduct]=useState([])
  const handleAllDemoProducts = async ()=>{
    setOpenPS(true)
    if(demoProduct.length===0){
      const data=await allDemoProducts();
      setDemoProduct(data.demoProducts)
    }
  }
  const handleAccept=async (id)=>{
    const data=await acceptProduct(id);
    if(data.AcceptedProduct){
      setDemoProduct(demoProduct.filter((p)=>{
          if(p._id==id){
            p.accepted=1  
            return p
          }
          return p
        }))
    }
    console.log(data);
  }
  const handleReject=async (id)=>{
    const data=await rejectProduct(id);
    if(data.RejectedProduct){
      setDemoProduct(demoProduct.filter((p)=>{
          if(p._id==id){
            p.accepted=0
            return p
          }
          return p
        }))
    }
    console.log(data.msg);
    
  }

  // Product Accepted
  const [acceptedProduct,setAcceptedProducts]=useState([]);
  const handleAcceptedProducts=async ()=>{
    setOpenPA(true)
    const data=await allProducts();
    setAcceptedProducts(data.products)
  }

  // Product Accepted
  const [userList,setUserList]=useState([]);
  const handleUserListr=async ()=>{
    setOpenUL(true)
    const data=await allProducts();
    setUserList(data.products)
  }
  // useEffect(()=>{
    
  // },[])
  const buttonStyle="flex justify-center items-center w-auto pl-5 pr-5 h-14 font-bold text-teal-600 rounded-xl bg-slate-200"
  return (
    <>
      <div className='absolute top-16 left-0 h-[calc(100%-4rem)] w-full bg-slate-500/50 flex justify-center items-center gap-10 font-mono text-2xl'>
          <button className={buttonStyle}>New User</button>
          <button className={buttonStyle}>User List</button>
          <button className={buttonStyle} onClick={handleAllDemoProducts}>Pruducts Submitted</button>
          <button className={buttonStyle} onClick={handleAcceptedProducts}>Pruducts Accepted</button>
      </div>
      
      {/* Products Submitted */}
      <MyModal setOpen={setOpenPS} open={openPS} width="w-[60%]" bg="bg-slate-500">
      {/* {demoProduct.loader?<Loader />: */}
        <table className="w-full h-auto bg-slate-500">
          <thead className="text-lg border-b text-gray-300 uppercase">
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
                      Action
                  </th>
              </tr>
          </thead>
          <tbody className='text-slate-200 h-auto'>
           {demoProduct? 
            demoProduct.map((p)=>{
              return  <tr className="border-b border-slate-600" key={p._id}>
                  <td className="px-6 py-3 font-medium text-center">
                    {p.title}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {p.desc}
                  </td>
                  <td className="px-2 py-1 items-center flex justify-center">
                    <img src={p.img} alt="" className='w-14 h-16' />
                  </td>
                  <td className="px-6 py-3 text-center">
                    {p.mrp}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {p.price}
                  </td>
                  <td className="text-center w-44 border-l">
                    {p.accepted!=99?p.accepted==1?<h2>Accepted</h2>:<h2>Rejected</h2>
                      :<>
                        <button className="font-medium text-blue-300 hover:underline" onClick={()=>handleAccept(p._id)}>Accept</button>
                        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                        <button className="font-medium text-red-300 hover:underline" onClick={()=>handleReject(p._id)}>Reject</button>
                       </>}
                  </td>
              </tr>})
              :<h1>No Product Submitted</h1>
              
          }</tbody>
        </table>
      </MyModal>  

      {/* Product Accepted */}
      <MyModal setOpen={setOpenPA} open={openPA} width="w-[60%]" bg="bg-slate-500">
      {/* {demoProduct.loader?<Loader />: */}
        <table className="w-full h-fit bg-slate-500">
          <thead className="text-lg border-b text-gray-300 uppercase">
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
              </tr>
          </thead>
          <tbody className='text-slate-200'>
           {acceptedProduct? 
            acceptedProduct.map((p)=>{
              return  <tr className="border-b border-slate-600" key={p._id}>
                  <td className="px-6 py-3 font-medium text-center">
                    {p.title}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {p.desc}
                  </td>
                  <td className="px-2 py-1 items-center flex justify-center">
                    <img src={p.img} alt="" className='w-14 h-16' />
                  </td>
                  <td className="px-6 py-3 text-center">
                    ₹ {p.mrp}
                  </td>
                  <td className="px-6 py-3 text-center">
                  ₹ {p.price}
                  </td>
              </tr>})
              :<h1 className='text-3xl'>No Accepted Product</h1>
              
          }</tbody>
        </table>
      </MyModal> 
    </>
  )
}
export default AdminPage
