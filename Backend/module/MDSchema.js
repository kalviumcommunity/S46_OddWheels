const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({ _id: Number, images: String });

const UserSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model("users", UserSchema);
const Carmodel = mongoose.model("images", CarSchema);
module.exports = { UserModel, Carmodel };
