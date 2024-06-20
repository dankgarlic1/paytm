const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { JWT_SECRET } = require("../config");

//user routes

//signup logic
const signupSchema = zod.object({
  firstName: zod.string().max(50),
  lastName: zod.string().max(50),
  password: zod.string().min(6),
  username: zod.string().min(3).max(30).email(),
});

router.post("signup", async (req, res) => {
  const validateData = signupSchema.safeParse(req.body);
  const existingUser = await User.findOne({ username: validateData.username });
  if (!validateData || existingUser._id) {
    return res.json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.create(validateData);
  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.json({
    message: "User created successfully",
    token: token,
  });
});
const signinSchema = zod.object({
  username: zod.string().min(3).max(30).email(),
  password: zod.string().min(6),
});

//signin logic
router.post("/signin", async (req, res) => {
  const validatedData = signinSchema.safeParse(req.body);
  if (!validatedData) {
    res.json({
      message: "Invalid input",
    });
  }
  const { username, password } = validatedData.data;
  const user = await User.findOne({ username });
  if (!username || !password) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }
  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.status(200).json({
    token: token,
  });
});

module.exports = router;
