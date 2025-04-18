const userModel = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateotp = require("../utils/generateotp");
const { sendEmail } = require("../utils/mailer");
require("dotenv").config();

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const comparepassword = await bcrypt.compare(password, user.password);
    if (!comparepassword) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const otp = generateotp();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    user.otp = otp;
    user.otpExpiry = otpExpiry;

    await user.save();

    await sendEmail(email, otp);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({
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
  try {
    const { name, email, password } = req.body;
    const existinguser = await userModel.findOne({ email });

    if (existinguser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const otp = generateotp();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    const createduser = await userModel.create({
      name,
      email,
      password: hashedpassword,
      otp,
      otpExpiry,
    });

    await sendEmail(email, otp);

    const token = jwt.sign({ userId: createduser._id }, process.env.JWT_SECRET);

    return res
      .status(201)
      .json({ message: "Register Successful", token: token });
  } catch (error) {
    console.error("Register Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const verifyotp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await userModel.findOne({ email });
  console.log("backend", user);

  if (otp !== user.otp || Date.now > user.otpExpiry) {
    return res.status(400).json({ message: "invalid or expired otp" });
  }
  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  res.status(201).json({ message: "OTP verified. User is now verified." });
};

const user = async (req, res) => {
  const userId = req.user.userId;

  const user = await userModel.findById(userId);

  if (!user) {
    return res.json({ message: "user not found" });
  }

  res.status(200).json({ user });
};

module.exports = { login, register, verifyotp, user };
