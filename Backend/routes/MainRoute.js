// Importing the express module
const express = require("express");

// Creating a router instance
const router = express.Router();

const Auth = require("./Auth");

const Fetch = require("./fetch");

router.use("/auth", Auth);

router.use("/fetch", Fetch);

// Exporting the router for use in other modules
module.exports = router;
