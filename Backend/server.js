// Importing necessary modules and dependencies
const express = require("express");
const {
  startDatabase,
  stopDatabase,
  isConnected,
  MDrouter,
} = require("./Database/ds");
const routes = require("./routes/MainRoute");
const cors = require("cors");

// Creating an instance of Express
const app = express();
const port = process.env.PUBLIC_PORT || 3000;
// Middleware for enabling CORS
app.use(cors());
// Middleware for parsing JSON bodies
app.use(express.json());

// Mounting routes
app.use("/api", routes); // Mounting main API routes
// app.use("/api/DB", MDrouter); // Mounting routes related to database operations

// Handling a GET request to /ping endpoint
app.get("/ping", (req, res) => {
  // Sending a JSON response with a message "pong"
  res.send({ message: "pong" });
});

// Handling a GET request to the root endpoint
app.get("/", (req, res) => {
  // Checking database connection status
  if (isConnected()) {
    console.log("🚀 Connected to MongoDB");
    // Sending a JSON response indicating connected status
    res.json({ connectionStatus: "connected" });
  } else {
    console.log(" Disconnected from MongoDB");
    // Sending a JSON response indicating disconnected status
    res.json({ connectionStatus: "Disconnected" });
  }
});

// Starting the server if this script is the main module
if (require.main === module) {
  app.listen(port, () => {
    // Logging a message when server starts
    console.log(`🚀 Server running on PORT: ${port}`);
    // Starting the database connection
    startDatabase();
  });
}

// Exporting the app for use in other modules
module.exports = app;
