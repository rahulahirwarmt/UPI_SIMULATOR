
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verify = require("../middleware/auth");

router.get("/all", verify, async (req, res) => {
  const users = await User.find({}, "-password");
  res.json(users);
});

router.patch("/update", verify, async (req, res) => {
  const { userId, updates } = req.body;

  await User.findByIdAndUpdate(userId, updates);

  res.json({
    status: "SUCCESS",
    message: "User updated"
  });
});

router.delete("/delete", verify, async (req, res) => {
  await User.findByIdAndDelete(req.body.userId);

  res.json({
    status: "SUCCESS",
    message: "User deleted"
  });
});

module.exports = router;
