// Importing the express module
const express = require("express");

// Creating a router instance
const router = express.Router();

const Auth = require("./Auth");

const Fetch = require("./fetch");

const Post = require("./Post");

router.use("/auth", Auth);

router.use("/fetch", Fetch);

router.use("/post", Post);

// Exporting the router for use in other modules
module.exports = router;
