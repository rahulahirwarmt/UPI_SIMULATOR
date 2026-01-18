
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dbConnect = require("./lib/db");

const app = express();

app.use(cors());
app.use(express.json());

dbConnect();

app.use("/api/auth", require("./api/auth"));
app.use("/api/users", require("./api/users"));
app.use("/api/features", require("./api/features"));
app.use("/api/dashboard", require("./api/dashboard"));

module.exports = app;

if (process.env.PORT) {
  app.listen(process.env.PORT, () =>
    console.log("Server running on " + process.env.PORT)
  );
}
