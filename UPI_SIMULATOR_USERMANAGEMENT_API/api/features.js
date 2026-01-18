
const express = require("express");
const router = express.Router();

const Feature = require("../models/Feature");
const User = require("../models/User");
const verify = require("../middleware/auth");

router.post("/add", verify, async (req, res) => {
  await Feature.create(req.body);
  res.json({ status: "SUCCESS", message: "Feature Added" });
});

router.post("/map", verify, async (req, res) => {
  await User.findByIdAndUpdate(req.body.userId, {
    $addToSet: { feature_ids: req.body.featureId }
  });

  res.json({ status: "SUCCESS" });
});

router.post("/unmap", verify, async (req, res) => {
  await User.findByIdAndUpdate(req.body.userId, {
    $pull: { feature_ids: req.body.featureId }
  });

  res.json({ status: "SUCCESS" });
});

module.exports = router;
