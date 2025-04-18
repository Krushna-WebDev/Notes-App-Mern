require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const noteSchema = mongoose.Schema({
  title: String,
  content: String,
  category: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",  
    required: true 
  }
});

const notemodel = mongoose.model("note", noteSchema);
module.exports = notemodel;
