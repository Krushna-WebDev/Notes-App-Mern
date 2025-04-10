const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const noteRoute = require("./routes/noteRoute");

app.use(cors());
app.use(express.json());

app.use("/api/users",userRoute);
app.use("/api/notes",noteRoute);


app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.listen(5000 ,()=>{
    console.log("server is running on port 5000");
})