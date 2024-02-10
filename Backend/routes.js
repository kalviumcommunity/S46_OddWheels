// Importing the express module
const express = require("express");

// Creating a router instance
const router = express.Router();

// Handling GET request to root endpoint
router.get("/", (req, res) => {
  // Sending a successful response with status code 200 and message
  res.status(200).send("GET request succeeded");
});

// Handling POST request to root endpoint
router.post("/", (req, res) => {
  // Sending a successful response with status code 201 (Created) and message
  res.status(201).send("POST request succeeded");
});

// Handling PUT request to root endpoint
router.put("/", (req, res) => {
  // Sending a successful response with status code 200 and message
  res.status(200).send("PUT request succeeded");
});

// Handling DELETE request to root endpoint
router.delete("/", (req, res) => {
  // Sending a successful response with status code 204 (No Content) and message
  res.status(204).send("DELETE request succeeded");
});

// Exporting the router for use in other modules
module.exports = router;
