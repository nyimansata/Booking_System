const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  Name: {
    type: String,
    required: [true, "Please name is required"],
  },
  Email: {
    type: String,
    required: [true, "Please email is required"],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "please add a valid email"],
    // unique: true,
  },
  Password: {
    type: String,
    required: [true, "Please password is required"],
    minlength: 12,
  },
  role: {
    type: String,
    enum: ["Student", "Admin", "Lecturer"],
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
