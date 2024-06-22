const express = require("express");
const router = express.Router();
const zod = require("zod");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const mongoose = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  res.status(200).json({ balance: account.balance });
});

const transferMoneySchema = zod.object({
  to: zod.string(),
  amount: zod.number().positive(),
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const validatedData = transferMoneySchema.safeParse(req.body);

  const senderId = req.userId;
  const { to, amount } = validatedData.data;
  let session;

  try {
    session = await mongoose.startSession();
    await session.startTransaction();
    const sender = await Account.findOne({ userId: senderId }).session(session);

    // calculate the updated sender balance
    sender.balance -= amount;
    if (sender.balance < 0) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }
    await sender.save();

    const receiver = await Account.findOne({ userId: to }).session(session);
    if (!receiver) {
      return res.status(400).json({
        message: "Invalid account",
      });
    }
    receiver.balance += amount;

    await receiver.save();

    // commit the changes if everything was successful
    await session.commitTransaction();
    res.status(200).json({ message: "Transfer successful" });
  } catch (error) {
    // If any error occurs, rollback the transaction
    await session.abortTransaction();

    // Logging the error
    console.error("Error in transfer:", error.message);

    // Send appropriate error response to client
    res.status(400).json({ message: error.message });
  } finally {
    await session.endSession();
  }
});
module.exports = router;
