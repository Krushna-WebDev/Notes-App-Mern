require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const noteRoute = require("./routes/noteRoute");
const PORT = process.env.PORT || 5000;
const path = require("path");

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/notes", noteRoute);


app.use(express.static(path.join(__dirname, "../Frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
