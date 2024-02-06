const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("get request succeeded");
});

router.post("/", (req, res) => {
  res.status(200).send("post request succeeded");
});

router.put("/", (req, res) => {
  res.status(200).send("put request succeeded");
});

router.delete("/", (req, res) => {
  res.status(200).send("delete request succeeded");
});

module.exports = router;
