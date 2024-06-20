const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongo_url = process.env.MONGO_URL;

mongoose.connect(mongo_url);

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 50,
    trim: true,
  },
  lastName: { type: String, required: true, maxLength: 50, trim: true },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
