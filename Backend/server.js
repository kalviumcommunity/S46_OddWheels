const express = require("express");
const { startDatabase, stopDatabase, isConnected, MDrouter } = require("./ds");
const app = express();
const port = process.env.PUBLIC_PORT || 3000;
const routes = require("./routes");

const cors = require("cors");
// define the ping route with the response in JSON

app.use("/api", routes);
app.use("/api/DB", MDrouter);

app.use(cors());
app.use(express.json());
app.get("/ping", (req, res) => {
  res.send({ message: "pong" });
});

app.get("/", (req, res) => {
  if (isConnected) {
    console.log("🚀 Connected to MongoDB");
    res.json({ connectionStatus: "connected" });
  } else {
    console.log(" Disconned to MongoDB");
    res.json({ connectionStatus: "Disconnected" });
  }
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
    startDatabase();
  });
}

module.exports = app;
