// Importing mongoose module
const mongoose = require("mongoose");

// Defining schema for Car
const CarSchema = new mongoose.Schema({
  _id: Number, // Unique identifier for car
  images: String, // String representing car images
});

// Defining schema for User
const UserSchema = new mongoose.Schema({
  username: String, // Name of the user
  password: String, // Email address of the user
  email: String, // Password of the user
  firstName: String, // First name of the user
  lastName: String, // Last name of the user
  location: String, // Location of the user
  bio: String,
  profileImage: {
    data: Buffer,
    contentType: String,
  }, // Profile image of the user
  post: Array, // Array of post ids
});

// Defining schema for Upload
const UploadSchema = new mongoose.Schema({
  file: {
    data: Buffer,
    contentType: String,
  },
});

// Creating UserModel using the UserSchema
const UserModel = mongoose.model("users", UserSchema);

// Creating Carmodel using the CarSchema
const Carmodel = mongoose.model("images", CarSchema);

// Creating UploadModel using the UploadSchema
const UploadModel = mongoose.model("uploads", UploadSchema);

// Exporting UserModel and Carmodel for use in other modules
module.exports = { UserModel, Carmodel, UploadModel };
