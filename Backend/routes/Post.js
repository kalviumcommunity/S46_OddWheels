const express = require("express");
const Post = express.Router();
const { postingPost } = require("../Database/DBpost");
const multer = require("multer"); // Multer for handling file uploads
// Configuring multer storage for storing files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
Post.post("/post", upload.single("postImage"), async (req, res) => {
  const token = req.cookies.token;
  console.log("token", token);
  if (!token) {
    return res.json({ verification: false, message: "Invalid token" });
  }
  await postingPost(token, req);

  res.json({ success: true, message: "Post created successfully" });
});

module.exports = Post;
