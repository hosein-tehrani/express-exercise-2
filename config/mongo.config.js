const { default: mongoose } = require("mongoose");
const DB_URL = "mongodb://localhost:27017/mongodb-tutorial";
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
