const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connection successful!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });