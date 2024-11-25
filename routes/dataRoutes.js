// const express = require('express');
// const User = require('../models/User');
// const { USERS_DATA_URL, USER_DATA_ERROR_MESSAGE } = require('../constants/app.const');
// const router = express.Router();

// router.get(USERS_DATA_URL, async (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const limit = 8;
//     const skip = (page - 1) * limit;

//     try {
//         const total = await User.countDocuments();
//         const users = await User.find().skip(skip).limit(limit);
//         res.status(200).json({ users, total });
//     } catch (error) {
//         res.status(500).json({ message: USER_DATA_ERROR_MESSAGE });
//     }
// });

// module.exports = router;

const express = require("express");
const User = require("../models/User");

const {
  USERS_DATA_URL,
  USER_DATA_ERROR_MESSAGE,
} = require("../constants/app.const");

const router = express.Router();

router.get(USERS_DATA_URL, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 8;
  const skip = (page - 1) * limit;
  const search = req.query.search || "";

  const searchQuery = search
    ? {
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { designation: { $regex: search, $options: "i" } },
          { profile: { $regex: search, $options: "i" }},
        ],
      }
    : {};

  try {
    const total = await User.countDocuments(searchQuery);
    const users = await User.find(searchQuery).skip(skip).limit(limit);
    res.status(200).json({ users, total });
  } catch (error) {
    res.status(500).json({ message: USER_DATA_ERROR_MESSAGE });
  }
});

router.put(`${USERS_DATA_URL}/:id`, async (req, res) => {
  const { id } = req.params;

  console.log('Updating user with ID:', id);
  
  const { firstName, lastName, email, designation, profile, role } = req.body;

  try {
    const updateFields = {};

    if (firstName) updateFields.firstName = firstName;
    if (lastName) updateFields.lastName = lastName;
    if (email) updateFields.email = email;
    if (designation) updateFields.designation = designation;
    if (profile) updateFields.profile = profile;
    if (role) updateFields.role = role;

    const user = await User.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

module.exports = router;
