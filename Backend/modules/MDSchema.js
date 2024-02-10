// Importing mongoose module
const mongoose = require("mongoose");

// Defining schema for Car
const CarSchema = new mongoose.Schema({
  _id: Number, // Unique identifier for car
  images: String, // String representing car images
});

// Defining schema for User
const UserSchema = new mongoose.Schema({
  _id: Number, // Unique identifier for user
  name: String, // Name of the user
  email: String, // Email address of the user
  password: String, // Password of the user
});

// Creating UserModel using the UserSchema
const UserModel = mongoose.model("users", UserSchema);

// Creating Carmodel using the CarSchema
const Carmodel = mongoose.model("images", CarSchema);

// Exporting UserModel and Carmodel for use in other modules
module.exports = { UserModel, Carmodel };
