const express = require("express"); // Express framework for handling routes
const Fetch = express.Router();
const { fetchingProfile } = require("../Database/DBfetch");
Fetch.get("/profile", async (req, res) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.json({ verification: false, message: "Invalid token" });
  }
  const data = await fetchingProfile(token);
  console.log(data, "--------------------------------");
  res.status(200).json(data);
});

module.exports = Fetch; // Exporting the router
