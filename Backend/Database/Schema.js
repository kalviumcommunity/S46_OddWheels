// Importing mongoose module
const mongoose = require("mongoose");

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

// Defining schema for Post Data
const PostSchema = new mongoose.Schema({
  userID: String, // User
  captions: String, // Name of the user
  hashTag: String, // Email address of the user
  postImage: {
    data: Buffer,
    contentType: String,
  }, // Profile image of the user
});

// Creating UserModel using the UserSchema
const UserModel = mongoose.model("users", UserSchema);

// Creating UserModel using the UserSchema
const PostModel = mongoose.model("posts", PostSchema);

// Exporting UserModel and Carmodel for use in other modules
module.exports = { UserModel, PostModel };
