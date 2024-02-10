// Importing required modules
const mongoose = require("mongoose");
const multer = require("multer");
const express = require("express");
require("dotenv").config(); // Loading environment variables from .env file

// Creating an instance of Express Router
const MDrouter = express.Router();

// Importing Mongoose models
const { UserModel, Carmodel, UploadModel } = require("../modules/MDSchema");

// Configuring multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to start the database connection
const startDatabase = async () => {
  try {
    // Connecting to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log("📦 Connected to MongoDB");
  } catch (error) {
    // Handling connection error
    console.error("❌ Error connecting to MongoDB:", error.message);
  }
};

// Function to stop the database connection
const stopDatabase = async () => {
  try {
    // Disconnecting from MongoDB
    await mongoose.disconnect();
    console.log("📦 Disconnected from MongoDB");
  } catch (error) {
    // Handling disconnection error
    console.error("❌ Error disconnecting from MongoDB:", error.message);
  }
};

// Function to check if the database is connected
const isConnected = () => {
  // Checking if the connection state is equal to 1 (connected)
  return mongoose.connection.readyState === 1;
};

// Route to get all users
MDrouter.get("/user", async (req, res) => {
  try {
    // Finding all documents in the UserModel collection
    const data = await UserModel.find({});
    // Sending the retrieved data as JSON response
    res.status(200).json(data);
  } catch (error) {
    // Handling error
    console.error("❌ Error fetching users:", error.message);
    res.status(500).send("Server Error");
  }
});

// Route to get all images
MDrouter.get("/image", async (req, res) => {
  try {
    // Finding all documents in the Carmodel collection
    const data = await Carmodel.find();
    // Sending the retrieved data as JSON response
    res.status(200).json(data);
  } catch (error) {
    // Handling error
    console.error("❌ Error fetching images:", error.message);
    res.status(500).send("Server Error");
  }
});

MDrouter.get("/uimages", async (req, res) => {
  try {
    // Retrieve all uploaded images
    const images = await UploadModel.find({}, { _id: 0, file: 1 });

    // Send the images as response
    res.json(images);
  } catch (error) {
    // Handle error
    console.error("❌ Error fetching images:", error.message);
    res.status(500).send("Server Error");
  }
});

// Route to handle file upload
MDrouter.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Check if the request has an image
    if (!req.file) {
      res.json({
        success: false,
        message: "You must provide at least 1 file",
      });
    } else {
      // Create an object for image upload
      let imageUploadObject = {
        file: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        },
      };
      const uploadObject = new UploadModel(imageUploadObject);
      // Save the object into the database
      const uploadProcess = await uploadObject.save();
      // Send success response
      res.json({
        success: true,
        message: "File uploaded successfully",
      });
    }
  } catch (error) {
    // Handle error
    console.error("❌ Error uploading file:", error.message);
    res.status(500).send("Server Error");
  }
});

// Exporting functions and router for use in other modules
module.exports = { startDatabase, stopDatabase, isConnected, MDrouter };
