const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://krushnawebdev26:KrushnaWebdev16@krushna.fbypd.mongodb.net/NotesApp?retryWrites=true&w=majority&appName=Krushna"
);

const noteSchema = mongoose.Schema({
  title: String,
  content: String,
  category: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",  // Reference to User model
    required: true 
  }
});

const notemodel = mongoose.model("note", noteSchema);
module.exports = notemodel;
