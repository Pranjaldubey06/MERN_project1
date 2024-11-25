const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const {
  USER_NOT_FOUND,
  INVALID_CREDENTIALS,
  ONE_HOUR,
  PASSWORD_UPDATE_SUCCESSFULLY,
  LOGIN_URL,
  FORGOT_PASSWORD_URL,
  SIGNUP_URL,
} = require("../constants/app.const.js");

const router = express.Router();

router.post(SIGNUP_URL, async (req, res) => {
  const { firstName, lastName, email, password, role, designation, profile } =
    req.body;

  // hashing password in encrypted format to make it unreadable format, which will make it crucial for securly storing user password in database. 
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    designation,
    profile,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post(LOGIN_URL, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: USER_NOT_FOUND });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: INVALID_CREDENTIALS });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: ONE_HOUR }
    );
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post(FORGOT_PASSWORD_URL, async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: USER_NOT_FOUND });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: PASSWORD_UPDATE_SUCCESSFULLY });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
