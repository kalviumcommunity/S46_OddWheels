const express = require("express");
const Post = express.Router();
const {
  postingPost,
  updatingPost,
  deletingPost,
} = require("../Database/DBpost");
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

Post.post("/update", async (req, res) => {
  console.log("update");
  const token = req.cookies.token;
  console.log("token", token);
  if (!token) {
    return res.json({ verification: false, message: "Invalid token" });
  }
  console.log(req.body);
  await updatingPost(token, req);

  res.json({ success: true, message: "Post created successfully" });
});
Post.post("/delete", async (req, res) => {
  console.log("update");
  const token = req.cookies.token;
  console.log("token", token);
  if (!token) {
    return res.json({ verification: false, message: "Invalid token" });
  }
  console.log(req.body);
  await deletingPost(token, req);

  res.json({ success: true, message: "Post created successfully" });
});

module.exports = Post;
