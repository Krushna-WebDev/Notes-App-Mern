import axios from "axios";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const EditNote = ({ closemodel,note }) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || ""); 
  const [category, setCategory] = useState(note?.category || "");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/notes/updatenote/${note._id}`,
        { title, content, category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      closemodel(); // Close the modal after successful update
    } catch (error) {
      console.error(error);
      alert("Failed to update the note");
    }
  };
  return (
    <div
      onClick={closemodel}
      className="fixed bg-black/50 min-h-full backdrop-blur-md flex justify-center items-center w-full left-0 top-0 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border p-5 rounded-lg shadow-lg w-96"
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Update Note</h1>
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
            required
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
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 transition focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            Update Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
