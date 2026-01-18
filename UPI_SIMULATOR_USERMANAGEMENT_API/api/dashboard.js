
const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Feature = require("../models/Feature");
const verify = require("../middleware/auth");

router.get("/", verify, async (req, res) => {
  const totalUsers = await User.countDocuments();
  const features = await Feature.countDocuments();

  res.json({
    totalUsers,
    features
  });
});

module.exports = router;
