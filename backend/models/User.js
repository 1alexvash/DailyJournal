const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  questions: {
    type: [String],
    default: [
      "What went well?",
      "What could have been improved?",
      "What will I do differently next time?"
    ],
    required: true
  }
});

module.exports = mongoose.model("user", UserSchema);
