const userModel = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    console.log("this is user", user);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const comparepassword = await bcrypt.compare(password, user.password);
    if (!comparepassword) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, "shhhh");
    res.json({
      message: "Login successful!",
      token,
      userId: user._id,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const existinguser = await userModel.findOne({ email });

  if (existinguser) {
    return res.status(400).json({ message: "User already exists" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  const createduser = await userModel.create({
    name,
    email,
    password: hashedpassword,
  });
  const token = jwt.sign({ id: createduser._id }, "shhhh");
  res.status(201).json({ message: "register Successfull", token: token });
};

const user = async (req, res) => {
  const userId = req.user.id;

  const user = await userModel.findById(userId);

  if (!user) {
    return res.json({ message: "user not found" });
  }

  res.status(200).json({ user });
};

module.exports = { login, register, user };
