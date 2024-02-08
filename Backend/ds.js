const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const MDrouter = express.Router();
const UserModel = require("./module/user");
const Carmodel = require("./module/image");

const startDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("📦 Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
  }
};

const stopDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log("📦 Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error disconnecting from MongoDB:", error.message);
  }
};

const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

MDrouter.get("/user", async (req, res) => {
  const data = await UserModel.find({});
  res.status(200).json(data);
});

MDrouter.get("/image", async (req, res) => {
  const data = await Carmodel.find();
  res.status(200).json(data);
});

module.exports = { startDatabase, stopDatabase, isConnected, MDrouter };
