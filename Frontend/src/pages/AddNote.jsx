import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import api from "../api";

const AddNote = ({ closemodel, setNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("work");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim().length > 15) {
      setError("Title can't be more than 15 characters.");
      return setTimeout(() => {
        setError("");
      }, 4000);
    }
    if (!title || !content || !category) {
      setError("Please Fill All Fields!");
      return setTimeout(() => {
        setError("");
      }, 4000);
    }

    const response = await api.post(
      "/notes/addnote",
      { title, content, category }
    );
    
    toast.success(response.data.message);

    try {
      const res = await api.get("/notes/getnote");
      setNotes(res.data);
      closemodel();
      setError("");
    } catch (error) {
      console.error("Error fetching updated notes:", error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.2,
          scale: { type: "spring", visualDuration: 0.3, bounce: 0.3 },
        }}
        onClick={closemodel}
        className="fixed   backdrop-blur-md flex items-center justify-center min-h-screen w-full left-0 top-0 z-50"
      >
        {/* Modal Box */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white border p-5 rounded-lg shadow-lg w-96"
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Create Note</h1>
            <button
              onClick={closemodel}
              className="text-gray-600 hover:text-gray-900"
            >
              <RxCross2 className="text-2xl cursor-pointer" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <select
              className="border p-2 w-full mb-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="ideas">Ideas</option>
              <option value="other">Other</option>
            </select>

            <textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border p-2 w-full mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
            />
            {error && <p className="text-red-500 mb-2">{error}</p>}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              type="submit"
              className="bg-blue-500 cursor-pointer text-white p-2 w-full rounded hover:bg-blue-600 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              Add Note
            </motion.button>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default AddNote;
