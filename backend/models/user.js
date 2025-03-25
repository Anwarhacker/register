const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // ✅ Keep this
  },
  email: {
    type: String,
    required: true,
    unique: true, // ✅ Keep this
  },
  password: {
    type: String,
    required: true,
  }
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
// Compare this snippet from backend/models/user.js: