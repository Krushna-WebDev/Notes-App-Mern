const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addnote,
  deletenotes,
  updatenote,
  getnote
} = require("../controllers/noteController");


router.get("/getnote",authMiddleware, getnote);
router.post("/addnote",authMiddleware, addnote);
router.delete("/deletenote/:id", deletenotes);
router.put("/updatenote/:id", updatenote);

module.exports = router;
