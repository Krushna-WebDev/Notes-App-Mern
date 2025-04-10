const notemodel = require("../models/noteModel");

const getnote = async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await notemodel.find({ userId });

    console.log("notes", notes);

    res.status(200).json(notes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching notes", error: error.message });
  }
};

const addnote = async (req, res) => {
  try {
    const userId = req.user.id;

    const { title, content, category } = req.body;
    console.log("backend",title, content, category,userId)
    if (!title || !content || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newNote = await notemodel.create({
      title,
      content,
      category,
      userId,
    });

    res.status(201).json({ message: "Note added successfully", note: newNote });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding note", error: error.message });
  }
};
const deletenotes = async (req, res) => {
  try {
    const id = req.params.id;
    await notemodel.findByIdAndDelete(id);
    res.status(201).json({ message: "Notes deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting Note", error });
  }
};
const updatenote = (req, res) => {
  // const { title, content, category } = req.body;
};

module.exports = {
  addnote,
  deletenotes,
  updatenote,
  getnote,
};
