const express = require("express");
const router = express.Router();
const zod = require("zod");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  res.status(200).json({ balance: account.balance });
});

const transferMoneySchema = zod.object({
  to: String,
  amount: Number,
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const validatedData = transferMoneySchema.safeParse(req.body);
});
module.exports = router;
