// Importing the express module
const express = require("express");

// Creating a router instance
const Auth = express.Router();

Auth.get("/test", (req, res) => {
  // Sending a successful response with status code 200 and message
  res.status(200).send("GET request succeeded");
});
// Exporting the router for use in other modules
module.exports = Auth;
