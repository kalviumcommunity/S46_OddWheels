const express = require("express"); // Express framework for handling routes
const Fetch = express.Router();
const {
  fetchingProfile,
  fetchingPost,
  fetchPostUser,
  fetchingUserPost,
} = require("../Database/DBfetch");

Fetch.get("/profile", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ verification: false, message: "Invalid token" });
  }
  const data = await fetchingProfile(token);
  res.status(200).json(data);
});

Fetch.get("/userpost", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ verification: false, message: "Invalid token" });
  }
  const data = await fetchingUserPost(token);
  res.status(200).json(data);
});

Fetch.get("/post", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ verification: false, message: "Invalid token" });
  }
  const data = await fetchingPost(token);
  res.status(200).json(data);
});

Fetch.post("/post/user", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ verification: false, message: "Invalid token" });
    }

    const user = await fetchPostUser(token, req.body.userId);
    if (!user) {
      return res
        .status(404)
        .json({ verification: false, message: "User not found" });
    }

    const userData = {
      username: user.username,
      profileImage: user.profileImage,
    };

    res.status(200).json({ verification: true, user: userData });
  } catch (error) {
    console.error("Error fetching post user:", error);
    res
      .status(500)
      .json({ verification: false, message: "Internal server error" });
  }
});

module.exports = Fetch; // Exporting the router
