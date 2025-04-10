import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { Routes,Route } from 'react-router-dom'
import Footer from './components/Footer'

const App = () => {
  return (
   <>
  
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
   </Routes>
   <Footer/>
   </>
  )
}

export default App