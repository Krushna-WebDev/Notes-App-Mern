import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../../Context/authContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://notes-app-mern-uqw9.onrender.com/api/users/login",
        {
          email,
          password,
        }
      );
      let token = "";
      if (response.status === 201) {
        token = response.data.token;
        console.log(token);
        localStorage.setItem("token", token);
        toast.success("OTP sent successfully");
        setUser({ email });
        setEmail("");
        setPassword("");
        navigate("/verify-otp");
      }
      const userDetail = await axios.post(
        "https://notes-app-mern-uqw9.onrender.com/api/users/userdetail",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(userDetail.data.user);
    } catch (error) {
      console.error("request failed", error);
      toast.error("failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="border p-8 rounded-lg shadow-lg max-w-sm w-full bg-white">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 cursor-pointer bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              {loading ? "Loading..." : "Login"}
            </motion.button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
