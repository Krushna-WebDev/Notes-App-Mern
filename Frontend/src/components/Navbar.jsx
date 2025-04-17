import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import userContext from "../../Context/authContext";
import Loader from "../components/Loader";
import { motion } from "motion/react";

const Navbar = ({ setSearchQuery }) => {
  const MotionLink = motion(Link);
  const { user, setUser } = useContext(userContext);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      setUser(null);
      setLoading(false);
      navigate("/login"); // optional: redirect to login after logout
    }, 1500); // loader duration (1.5s)
  };
  if (loading) return <Loader />;
  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 py-4 px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-gray-900">
          Notes App
        </Link>

        {/* Search Bar */}
        <div className="flex w-full sm:w-auto items-center border-2 border-amber-500 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-amber-400">
          <input
            className="py-2 px-3 outline-none w-full sm:w-40 md:w-60 text-gray-800 placeholder-gray-500"
            type="search"
            placeholder="Search notes..."
            aria-label="Search notes"
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
          <button
            className="bg-amber-500 px-4 py-2.5 text-white text-xl hover:bg-amber-600 transition"
            aria-label="Search"
          >
            <IoSearchSharp />
          </button>
        </div>

        {/* Auth Button */}
        {user ? (
          <motion.button
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 0.85 }}
            onClick={handleLogout}
            className="bg-red-500 cursor-pointer hover:bg-red-600 w-full sm:w-auto py-2 px-4 rounded-xl text-white font-bold"
          >
            Logout
          </motion.button>
        ) : (
          <MotionLink
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 0.85 }}
            to="/login"
            className="bg-blue-500 cursor-pointer hover:bg-blue-600 w-full sm:w-auto py-2 px-4 rounded-xl text-white font-semibold"
          >
            Get Started
          </MotionLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
