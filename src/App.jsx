import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './component/Home'
import Navbar from './component/Navbar'
import UserLogin from './routes/UserLogin'
import AdminLogin from './routes/AdminLogin'
import Admin from './Contexts/Admin'
import Product from './Contexts/Product'
import User from './Contexts/User'
import UserPage from './routes/UserPage'
import AdminPage from './routes/AdminPage'

function App() {
  return (
    <BrowserRouter>
    {/* <Admin> */}
      <User>
        <Product>
            <Navbar/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/userlogin' element={<UserLogin/>}/>
              <Route path='/adminlogin' element={<AdminLogin/>}/>
              <Route path='/user' element={<UserPage/>}/>
              <Route path='/admin' element={<AdminPage/>}/>
            </Routes>
        </Product>
      </User>
    {/* </Admin> */}
    </BrowserRouter>
  )
}

export default App
