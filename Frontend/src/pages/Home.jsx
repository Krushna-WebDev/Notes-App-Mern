import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import AddNote from "./AddNote";
import axios from "axios";
import Navbar from "../components/Navbar";

const Home = () => {
  const [showAddNote, setShowAddNote] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [notes, setNotes] = useState([]);
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery) ||
    note.content.toLowerCase().includes(searchQuery)
  );

  useEffect(() => {
    const fetchnotes = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found, user not authenticated");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/notes/getnote", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNotes(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchnotes();
  }, []);

  const handleDelete = async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/notes/deletenote/${id}`
    );
    alert(response.data.message);
  };

  const closemodel = () => {
    return setShowAddNote(false);
  };
  return (
    <>
      <Navbar setSearchQuery={setSearchQuery}  />
      <div className="h-screen  mx-auto max-w-7xl px-4">
        <div className="flex mt-10 justify-end">
          <button
            onClick={() => setShowAddNote(true)}
            className=" flex items-center bg-amber-600 text-white font-bold  shadow-xl px-2 py-2 cursor-pointer rounded-2xl "
          >
            <FaPlus />
            Add Notes
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              className="border border-gray-300 rounded-2xl shadow-lg p-5"
            >
              <div className="flex justify-between">
                <h1 className="font-merriweather text-3xl font-bold mb-3">
                  {note.title}
                </h1>
                <div className="flex item-center gap-2">
                  <MdEdit className="text-gray-600 text-2xl" />
                  <MdDelete
                    onClick={() => handleDelete(note._id)}
                    className="text-red-600 cursor-pointer text-2xl"
                  />
                </div>
              </div>
              <p className="text-lg ">{note.content}</p>
            </div>
          ))}
        </div>
        {showAddNote && <AddNote closemodel={closemodel} />}
      </div>
    </>
  );
};

export default Home;
