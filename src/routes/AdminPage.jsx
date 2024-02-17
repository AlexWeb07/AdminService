import React, { useState,useContext, useEffect } from 'react'
import MyModal from '../component/MyModal'
import ProductContext from '../Contexts/ProductContext'
import Loader from '../component/Loader'
import UserContext from '../Contexts/UserContext'
import { useNavigate } from 'react-router-dom'

function AdminPage() {
  const navigate=useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("adminAuthToken")){
      alert("Please login first with valid id and password..")
      navigate("/");
    }
  },[])

  // LOADER
  const [loader,setLoader]=useState(true)

  // Modals open/close states
  const [openNU,setOpenNU]=useState(false)
  const [openUL,setOpenUL]=useState(false)
  const [openPS,setOpenPS]=useState(false)
  const [openPA,setOpenPA]=useState(false)
  const [openUU,setOpenUU]=useState(false)

  // product Context
  const productContext=useContext(ProductContext)
  const {allDemoProducts,acceptProduct,rejectProduct, allProducts}=productContext

  // Users Context
  const userContext=useContext(UserContext)
  const {createUser,allUser,updateUser,deleteUser}=userContext

  // Product Submitted
  const [demoProduct,setDemoProduct]=useState([])
  const handleAllDemoProducts = async ()=>{
    setOpenPS(true)
    if(demoProduct.length==0){
      setLoader(true)
      const data=await allDemoProducts();
      if(data.status!=401){
        setLoader(false)
        setDemoProduct(data.demoProducts.filter((p)=>{
          return p.accepted==99 && p
        }))
      }
      else{
        alert(data.msg)
        setLoader(false)
        setOpenPS(false)
      }
    }
  }
  // ## Acccept product
  const handleAccept=async (id)=>{
    const data=await acceptProduct(id);
    if(data.status!=401){
      if(data.AcceptedProduct){
        setDemoProduct(demoProduct.filter((p)=>{
            return p && p._id!=id
        }))
        alert(data.msg);
      }
    }
    else alert(data.msg)

  }
  // ## Reject product
  const handleReject=async (id)=>{
    const data=await rejectProduct(id);
    if(data.status!=401){
      if(data.RejectedProduct){
        setDemoProduct(demoProduct.filter((p)=>{
            return p && p._id!=id
        }))
        alert(data.msg);
      }
    }
    else alert(data.msg)    
  }


  // Product Accepted
  const [acceptedProduct,setAcceptedProducts]=useState([]);
  const handleAcceptedProducts=async ()=>{
    setOpenPA(true)
    setLoader(true)
    const data=await allProducts();
    if(data.status!=401){
      setAcceptedProducts(data.products)
      setLoader(false)
    }
    else{
      alert(data.msg)
      setLoader(false)
      setOpenPA(false)
    }
  }

  // User List
  const [userList,setUserList]=useState([]);
  const handleUserList=async ()=>{
    setOpenUL(true)
    setLoader(true)
    const data = await allUser();
    if(data.status!=401){
      setUserList(data.Users)
      setLoader(false)
    }
    else{
      alert(data.msg)
      setOpenUL(false)
      setLoader(false) 
    }
    
  }

  // New User
  const inputStyle='w-[80%] h-10 bg-transparent border border-[1.5px] placeholder:text-teal-100/50 text-teal-200 outline-none pl-3 border-slate-400 rounded-md'
  const handleNewUser=()=>{
    setOpenNU(true)
  }

  const [newUser,setNewUser]=useState({name:"",email:"",password:""});
  const handleChange=(e)=>{
      setNewUser({...newUser,[e.target.name]:e.target.value})
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const {name,email,password}=newUser
    const data= await createUser(name,email,password)
    if(data.status!=401){
      if(data.user){
        setNewUser({name:"",email:"",password:""})
      }
      alert(data.msg);
    }
    else{
      alert(data.msg);
      setOpenNU(false)
    }
  }
  

  // Update User
  const [updatedUser,setUpdatedUser]=useState({});
  const handleEditUser=(user)=>{
    setUpdatedUser({...user,password:""});
    setOpenUU(true); 
  }
  const handleChangeUser=(e)=>{
    setUpdatedUser({...updatedUser,[e.target.name]:e.target.value})
  }
  const handleUpdate=async (e)=>{
    e.preventDefault();
    const {_id,name,email,password}=updatedUser;
    const data = await updateUser(name,email,password,_id);
    if(data.status!=401){
      alert(data.msg);
      if(data.status==200){
        setUserList(userList.filter(u=>{
          if(u._id==_id){
            u.email=email;
            u.name=name;
          }
          return u;
        }))
        setOpenUU(false);
      }
    }
    else{
      alert(data.msg);
      setOpenUU(false)
    }
  }

  // Delete User
  const handleDeleteUser=async(id)=>{
      const data=await deleteUser(id);
      if(data.status!=401){
        alert(data.msg)
        setLoader(true)
        setUserList(userList.filter(u=>{
          if(u._id!=id)
            return u;
        }))
        setLoader(false)
      }
      else{
        alert(data.msg)
        setLoader(false)
      }
  }

  const buttonStyle="flex justify-center items-center w-auto pl-5 pr-5 h-14 font-bold text-teal-600 rounded-xl bg-slate-200"
  return (
    <>

      {/* What shown to the admin first  */}
      <div className='absolute top-16 left-0 h-[calc(100%-4rem)] w-full bg-slate-500/50 flex justify-center items-center gap-10 font-mono text-2xl'>
          <button className={buttonStyle} onClick={handleAllDemoProducts}>Pruducts Submitted</button>
          <button className={buttonStyle} onClick={handleAcceptedProducts}>Pruducts Accepted</button>
          <button className={buttonStyle} onClick={handleUserList}>User List</button>
          <button className={buttonStyle} onClick={handleNewUser}>New User</button>
      </div>
      
      {/* Products Submitted */}
      <MyModal setOpen={setOpenPS} open={openPS} width="w-[60%]" bg="bg-slate-600">
      {loader?<Loader />: demoProduct.length!=0 ?
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
                      Action
                  </th>
              </tr>
          </thead>
          <tbody className='text-slate-100 h-auto'>
           
            {demoProduct.map((p)=>{
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
                    {p.mrp}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {p.price}
                  </td>
                  <td className="text-center w-44 border-l">
                    {p.accepted!=99?p.accepted==1?<h2 className='text-blue-400'>Accepted</h2>:<h2 className='text-red-400'>Rejected</h2>
                      :<>
                        <button className=" h-8 w-8 font-extrabold text-blue-400 hover:bg-blue-400 hover:text-slate-700 border-2 border-blue-400 rounded-full" onClick={()=>handleAccept(p._id)}>✓</button>
                        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                        <button className="h-8 w-8 font-extrabold text-red-400 hover:bg-red-400 hover:text-slate-700 border-2 border-red-400 rounded-full" onClick={()=>handleReject(p._id)}>✕</button>
                       </>}
                  </td>
              </tr>})              
          }</tbody>
        </table>:<h1 className='w-full h-[88%] text-2xl text-teal-200 font-medium flex justify-center items-center'>No Submitted Product</h1>}
      </MyModal>

      {/* Product Accepted */}
      <MyModal setOpen={setOpenPA} open={openPA} width="w-[60%]" bg="bg-slate-700">
      {loader?<Loader />:acceptedProduct.length!=0?
        <table className="w-full h-fit bg-slate-700">
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
           {acceptedProduct.map((p)=>{
              return  <tr className="border-b border-slate-600" key={p._id}>
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
                    ₹ {p.mrp}
                  </td>
                  <td className="px-6 py-3 text-center">
                  ₹ {p.price}
                  </td>
              </tr>})}
          </tbody>
        </table>:<h1 className='w-full h-[88%] text-2xl text-teal-200 font-medium flex justify-center items-center'>No Accepted Product</h1>}
      </MyModal> 

    {/* User List */}
      <MyModal setOpen={setOpenUL} open={openUL} width="w-[50%]" bg="bg-slate-700">
      {loader?<Loader />:userList.length!=0? 
        <table className="w-full h-fit bg-slate-700">
          <thead className="text-lg border-b text-gray-300 uppercase">
              <tr>
                  <th scope="col" className="px-6 py-3">
                      Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Password
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Action
                  </th>
              </tr>
          </thead>
          <tbody className='text-slate-200'>
           {userList.map((u)=>{
              return  <tr className="border-b border-slate-600" key={u._id}>
                  <td className="px-6 py-3 font-medium text-center">
                    {u.name}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {u.email}
                  </td>
                  <td className="px-6 py-3 text-center">
                    ********
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button className="font-medium text-blue-300 hover:underline" onClick={()=>handleEditUser(u)}>Edit</button>
                          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
                    <button className="font-medium text-red-300 hover:underline" onClick={()=>handleDeleteUser(u._id)}>Delete</button>
                  </td>
              </tr>})}
            </tbody>
        </table>:<h1 className='w-full h-[88%] text-2xl text-teal-200 font-medium flex justify-center items-center'>No Accepted Product</h1>}
      </MyModal> 

    {/* New User */}
      <MyModal setOpen={setOpenNU} open={openNU} height="h-[50%]" width="w-[30%]" bg="bg-slate-700">
          <form className='w-full h-[89%] flex flex-col justify-evenly items-center' onSubmit={handleSubmit}>
            <h1 className='text-slate-200 text-2xl font-bold'>Add New User</h1>
            <input required type="text" name='name' value={newUser.name} className={`${inputStyle}`} placeholder='Enter User Name' onChange={handleChange}/>
            <input required type="email" name='email' value={newUser.email} className={inputStyle} placeholder='Enter User Email Id' onChange={handleChange}/>
            <input required type="password" name='password' value={newUser.password} className={inputStyle} placeholder='Enter Password' onChange={handleChange}/>
            <input type="submit" value="Submit" className='w-[30%] h-10 bg-slate-800 rounded-3xl text-slate-100'/>
          </form>
      </MyModal> 

      {/*Update User*/}
      <MyModal setOpen={setOpenUU} open={openUU} height="h-[50%]" width="w-[30%]" bg="bg-slate-700">
          <form className='w-full h-[89%] flex flex-col justify-evenly items-center' onSubmit={handleUpdate}>
            <h1 className='text-slate-200 text-2xl font-bold'>Update User</h1>
            <input required type="text" name='name' value={updatedUser.name} className={inputStyle} placeholder='Enter User Name' onChange={handleChangeUser }/>
            <input required type="email" name='email' value={updatedUser.email} className={inputStyle} placeholder='Enter User Email Id' onChange={handleChangeUser }/>
            <input type="password" name='password' value={updatedUser.password} className={inputStyle} placeholder='Enter new password' onChange={handleChangeUser }/>
            <input type="submit" name='sub' value="Submit" className='w-[30%] h-10 bg-slate-800 rounded-3xl text-slate-100'/>
          </form>
      </MyModal> 
    </>
  )
}
export default AdminPage
