const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  Name: {
    type: String,
    required: [true, "Please name is required"],
  },
  Email: {
    type: String,
    required: [true, "Please email is required"],
    // unique: true,
  },
  Password: {
    type: String,
    required: [true, "Please password is required"],
  },
  role: {
    type: String,
    enum: ["student", "Admin", "Lecturer"],
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
