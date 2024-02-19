// Importing the express module
const express = require("express");

// Creating a router instance
const router = express.Router();

const Auth = require("./Auth");

router.use("/auth", Auth);

// Exporting the router for use in other modules
module.exports = router;
