import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userContext from "../../Context/authContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error("Please fill in all fields!");
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://notes-app-mern-uqw9.onrender.com/api/users/register",
        { name, email, password }
      );

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        setUser({ email });
        setName("");
        setEmail("");
        setPassword("");
        navigate("/verify-otp");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Registration failed! Try again."
      );
    } finally {
      setLoading(false);
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
            <motion.button
              whileHover={{
                scale: 1.05,
                transition: {
                  duration: 0.2,
                  ease: "easeInOut",
                },
              }}
              whileTap={{
                scale: 1,
                transition: {
                  duration: 0.1,
                  ease: "easeOut",
                },
              }}
              className="bg-blue-500 cursor-pointer font-bold py-2 px-3 rounded-md mt-5 text-white uppercase"
            >
              {loading ? "Loading..." : "Register"}
            </motion.button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
