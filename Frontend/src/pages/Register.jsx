import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill in all fields!");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        { name, email, password }
      );
      localStorage.setItem("token", response.data.token);
      alert(response.data.message);
      setName("");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Registration failed! Try again.");
    }
  };
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="border p-8 rounded-lg shadow-lg max-w-sm w-full   ">
          <h1 className="text-center m-5 font-bold text-3xl uppercase">
            Register
          </h1>
          <form onSubmit={handleSubmit} className="flex m-5 flex-col">
            <label className="block text-gray-700 font-medium mb-1">
              Name:
            </label>
            <input
              className="py-2 rounded-md px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={name}
              placeholder="Enter Your Name..."
              onChange={(e) => setName(e.target.value)}
            />
            <label className="block text-gray-700 font-medium mb-1">
              Email:
            </label>
            <input
              className="py-2 rounded-md px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="Email"
              value={email}
              placeholder="Enter Your Email..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block text-gray-700 font-medium mb-1">
              Password:
            </label>
            <input
              className="py-2 rounded-md  px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              value={password}
              placeholder="Enter Your Password..."
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-blue-500 font-bold py-2 px-3 rounded-md mt-5 text-white uppercase">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
