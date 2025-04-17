import React, { useEffect, useState, useContext } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import AddNote from "./AddNote";
import axios from "axios";
import Navbar from "../components/Navbar";
import userContext from "../../Context/authContext";
import EditNote from "./EditNote";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Home = () => {
  const { user } = useContext(userContext);
  const [loading, setLoading] = useState(true);
  const [showAddNote, setShowAddNote] = useState(false);
  const [showEditNote, setShowEditNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectcategory, setSelectCategory] = useState("");
  const [notes, setNotes] = useState([]);
  const [confirmModel, setConfirmModel] = useState(false);

  const filteredNotes = notes.filter((note) => {
    const matchCategory = selectcategory
      ? note.category === selectcategory
      : true;
    const matchSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
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
      } finally {
        setLoading(false);
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

      toast.success(response.data.message);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete the note.");
    }
  };
  const handleModel = (note) => {
    setSelectedNote(note);
    setConfirmModel(true);
  };

  const handleEdit = (note) => {
    setSelectedNote(note);
    setShowEditNote(true);
  };

  const closeAddmodel = () => setShowAddNote(false);
  const closeEditmodel = () => setShowEditNote(false);
  if (loading) return <Loader />;

  return (
    <>
      <Navbar setSearchQuery={setSearchQuery} />
      {user ? (
        <div className="h-screen mx-auto max-w-7xl px-4">
          <div className="flex mt-10 justify-between">
            <select
              className="bg-white border p-2 mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setSelectCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="ideas">Ideas</option>
              <option value="other">Other</option>
            </select>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddNote(true)}
              className="flex items-center bg-slate-600 text-white font-bold shadow-xl px-2 py-2 cursor-pointer rounded-xl"
            >
              <FaPlus className="mx-1" />
              Add Notes
            </motion.button>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {filteredNotes.length === 0 ? (
              <div className="text-center col-span-full mt-10 text-gray-500 text-lg font-medium">
                No Notes Found
              </div>
            ) : (
              filteredNotes.map((note) => (
                <motion.div
                  key={note._id}
                  className="border border-gray-300 rounded-2xl shadow-lg p-5"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between">
                    <div className="flex sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
                      <h1 className="font-merriweather text-2xl font-bold text-gray-800">
                        {note.title}
                      </h1>
                    </div>
                    <div className="flex h-7 item-center gap-2">
                      <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full shadow-sm border border-blue-300">
                        {note.category}
                      </span>
                      <MdEdit
                        onClick={() => handleEdit(note)}
                        className="text-gray-600 cursor-pointer text-2xl"
                      />
                      <MdDelete
                        onClick={() => handleModel(note)}
                        className="text-red-600 cursor-pointer text-2xl"
                      />
                    </div>
                  </div>
                  <p className="text-lg">{note.content}</p>
                </motion.div>
              ))
            )}
          </motion.div>

          {showAddNote && (
            <AddNote closemodel={closeAddmodel} setNotes={setNotes} />
          )}
          {showEditNote && (
            <EditNote closemodel={closeEditmodel} note={selectedNote} />
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
          className="flex justify-center items-center min-h-screen bg-gray-50"
        >
          <p className="text-lg sm:text-xl font-semibold text-gray-600 px-4 text-center">
            Please Login First To See Notes
          </p>
        </motion.div>
      )}
      {confirmModel && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            type: "spring",
          }}
          onClick={() => setConfirmModel(false)}
          className="fixed min-h-screen backdrop-blur-md top-0 left-0 w-full flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              Delete Note?
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this note? This action cannot be
              undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium"
                onClick={() => setConfirmModel(false)} // Replace with your cancel function
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
                className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold"
                onClick={() => {
                  handleDelete(selectedNote._id);
                  setConfirmModel(false);
                }}
              >
                Delete
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Home;
