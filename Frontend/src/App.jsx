import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import { UserProvider } from "../Context/authContext";
import Verifyotp from "./pages/Verifyotp";

const App = () => {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<Verifyotp />} />
        </Routes>
        <Footer />
      </UserProvider>
    </>
  );
};

export default App;
