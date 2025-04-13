import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import userContext from "../../Context/authContext";

const Navbar = ({ setSearchQuery }) => {
  const { user, setUser } = useContext(userContext);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null)
  };
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="text-3xl md:text-4xl font-bold text-gray-900">
          Notes App
        </Link>

        {/* Search Bar */}
        <div className="flex items-center border-2 border-amber-500 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-amber-400">
          <input
            className="py-2 px-3 outline-none w-40 md:w-60 text-gray-800 placeholder-gray-500"
            type="search"
            placeholder="Search notes..."
            aria-label="Search notes"
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
          <button
            className="bg-amber-500 px-4 py-2.5 text-white text-xl hover:bg-amber-600 transition focus:outline-none"
            aria-label="Search"
          >
            <IoSearchSharp />
          </button>
        </div>

        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 cursor-pointer py-2 px-3 rounded-xl text-white font-bold "
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            Get Started
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
