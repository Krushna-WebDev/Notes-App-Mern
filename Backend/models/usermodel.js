const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://krushnawebdev26:KrushnaWebdev16@krushna.fbypd.mongodb.net/NotesApp?retryWrites=true&w=majority&appName=Krushna")
const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;