const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes.js");
const dataRoutes = require("./routes/dataRoutes.js");
const {
  MONGO_DB_CONNECTED,
  MONGO_DB_CONNECTED_ERROR,
  SERVER_RUNNING_MESSAGE,
  PORT,
  API_AUTH_URL,
  API_DATA_URL,
} = require("./constants/app.const.js");

dotenv.config(); // Load environment variables at the very top
mongoose.set("debug", true); // Logs all MongoDB operations

const app = express();

// Enable CORS for the frontend
app.use(
  cors({
    origin: process.env.FRONT_END_ACCESS_URL, // Frontend URL
    methods: "GET, POST, PUT",
  })
);

// Middleware to parse JSON data in requests
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(MONGO_DB_CONNECTED))
  .catch((error) => console.error(MONGO_DB_CONNECTED_ERROR, error));

// Define routes
app.use(API_AUTH_URL, authRoutes); // e.g., /api/auth/signup, /api/auth/login
app.use(API_DATA_URL, dataRoutes); // e.g., /api/data/users

// Start the server
app.listen(PORT, () => {
  console.log(`${SERVER_RUNNING_MESSAGE} ${PORT}`);
});