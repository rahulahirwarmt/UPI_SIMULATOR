
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");

const User = require("../models/User");
const Token = require("../models/Token");

router.post("/register", async (req, res) => {
  const { role, email, password, name, username } = req.body;

  if (!email || !password || !name || !username) {
    return res.status(400).json({ error: "All fields (email, password, name, username) are required" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    role,
    email,
    password: hashed,
    name,
    username
  });

  res.json({
    status: "SUCCESS",
    statusDescription: "User Create Successfully",
    userData: { role, email, name, username }
  });
});

router.post("/login", async (req, res) => {
  const { email, username, password } = req.body;

  if ((!email && !username) || !password) {
    return res.status(400).json({ error: "Email/Username and Password are required" });
  }

  const user = await User.findOne({
    $or: [{ email }, { username }]
  });

  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      features: user.feature_ids,
      name: user.name,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY }
  );

  const refreshToken = uuid();

  await Token.create({
    userId: user._id,
    refreshToken
  });

  res.json({
    token,
    refresh_token: refreshToken
  });
});

router.post("/refresh", async (req, res) => {
  const { refresh_token } = req.body;

  const saved = await Token.findOne({ refreshToken: refresh_token });
  if (!saved) return res.status(401).json({ error: "Invalid refresh token" });

  const user = await User.findById(saved.userId);

  const newToken = jwt.sign(
    {
      id: user._id,
      role: user.role,
      features: user.feature_ids,
      name: user.name,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY }
  );

  res.json({ token: newToken });
});

router.post("/logout", async (req, res) => {
  const { refresh_token } = req.body;
  await Token.deleteOne({ refreshToken: refresh_token });

  res.json({
    status: "SUCCESS",
    message: "Logged out successfully"
  });
});

module.exports = router;
