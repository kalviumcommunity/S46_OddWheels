// Importing required modules
const mongoose = require("mongoose");
require("dotenv").config(); // Loading environment variables from .env file
const express = require("express");
const MDrouter = express.Router(); // Creating an instance of Express Router
const { UserModel, Carmodel } = require("../module/MDSchema"); // Importing Mongoose models

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
  // Finding all documents in the UserModel collection
  const data = await UserModel.find({});
  // Sending the retrieved data as JSON response
  res.status(200).json(data);
});

// Route to get all images
MDrouter.get("/image", async (req, res) => {
  // Finding all documents in the Carmodel collection
  const data = await Carmodel.find();
  // Sending the retrieved data as JSON response
  res.status(200).json(data);
});

// Exporting functions and router for use in other modules
module.exports = { startDatabase, stopDatabase, isConnected, MDrouter };
