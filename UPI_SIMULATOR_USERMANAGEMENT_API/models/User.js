
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["amex", "bravo", "mercury"],
    default: "mercury"
  },
  feature_ids: [String]
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
