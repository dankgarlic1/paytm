const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

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

  const userId = user._id;

  //create account in bank also
  await Account.create({
    userId,
    balance: 1 + Math.random() * 1000,
  });
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
const updateInfo = zod.Schema({
  password: zod.string().min(6),
  firstName: zod.string().max(50),
  lastName: zod.string().max(50),
});
router.put("/update", authMiddleware, async (req, res) => {
  const validatedData = updateInfo.safeParse(req.body);
  const { userId } = req;
  await User.updateOne(validatedData, {
    id: userId,
  });

  res.json({
    message: "Updated Successfully",
  });
});

//get users by their name filterable

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});
module.exports = router;
