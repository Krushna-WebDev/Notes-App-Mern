import React, { useContext, useState } from "react";
import userContext from "../../Context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

const Verifyotp = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setotp] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const email = user?.email;

  if (!user) {
    return navigate("/");
  }
  const handlesubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://notes-app-mern-uqw9.onrender.com/api/users/verifyotp",
        { email, otp }
      );
      if (response.status === 201) {
        toast.success(response.data?.message);
        navigate("/");
      }
    } catch (error) {
      console.log("request failed", error);
      toast.error("Failed to Send OTP");
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <Loader />;

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          OTP Verification
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter the OTP sent to your email address
        </p>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          type="text"
          onChange={(e) => setotp(e.target.value)}
          placeholder="Enter your OTP"
        />
        <motion.button
          whilehover={{
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
          onClick={handlesubmit}
          className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Verify OTP
        </motion.button>
      </div>
    </div>
  );
};

export default Verifyotp;
