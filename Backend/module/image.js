const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({ _id: Number, images: String });

const Carmodel = mongoose.model("images", CarSchema);
module.exports = Carmodel;
