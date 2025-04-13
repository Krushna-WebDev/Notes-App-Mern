import React, { useEffect, useState, useContext } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import AddNote from "./AddNote";
import axios from "axios";
import Navbar from "../components/Navbar";
import userContext from "../../Context/authContext";
import EditNote from "./EditNote";

const Home = () => {
  const { user } = useContext(userContext);
  console.log("user", user);
  const [showAddNote, setShowAddNote] = useState(false);
  const [showEditNote, setShowEditNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectcategory, setSelectCategory] = useState("");
  const [notes, setNotes] = useState([]);

  const filteredNotes = notes.filter((note) => {
    const matchCategory = selectcategory
      ? note.category === selectcategory
      : true;
    const matchSearch =
      note.title.toLowerCase().includes(searchQuery) ||
      note.content.toLowerCase().includes(searchQuery);
    return matchCategory && matchSearch;
  });

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
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:5000/api/notes/deletenote/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      // ✅ Remove deleted note from state
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete the note.");
    }
  };

  const handleEdit = (note) => {
    setSelectedNote(note); // Set the selected note
    setShowEditNote(true); // Open the edit modal
  };

  const closeAddmodel = () => {
    return setShowAddNote(false);
  };
  const closeEditmodel = () => {
    return setShowEditNote(false);
  };
  return (
    <>
      <Navbar setSearchQuery={setSearchQuery} />
      {user ? (
        <>
          <div className="h-screen  mx-auto max-w-7xl px-4">
            <div className="flex mt-10 justify-between">
              <select
                className="bg-white border p-2  mb-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setSelectCategory(e.target.value)}
              >
                <option value="">All</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="ideas">Ideas</option>
                <option value="other">Other</option>
              </select>
              <button
                onClick={() => setShowAddNote(true)}
                className=" flex  items-center bg-slate-600 text-white font-bold  shadow-xl px-2 py-2 cursor-pointer rounded-xl "
              >
                <FaPlus className="mx-1" />
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
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
                      <h1 className="font-merriweather text-2xl font-bold text-gray-800">
                        {note.title}
                      </h1>
                      <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1 rounded-full shadow-sm border border-blue-300">
                        {note.category}
                      </span>
                    </div>
                    <div className="flex item-center gap-2">
                      <MdEdit
                        onClick={() => handleEdit(note)}
                        className="text-gray-600 cursor-pointer text-2xl"
                      />
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
            {showAddNote && (
              <AddNote closemodel={closeAddmodel} setNotes={setNotes} />
            )}
            {showEditNote && (
              <EditNote closemodel={closeEditmodel} note={selectedNote} />
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
          <p className="text-lg sm:text-xl font-semibold text-gray-600 px-4 text-center">
            Please Login First To See Notes
          </p>
        </div>
      )}
    </>
  );
};

export default Home;
