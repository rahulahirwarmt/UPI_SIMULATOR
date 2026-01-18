
const mongoose = require("mongoose");

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB Connected");
}

module.exports = dbConnect;
