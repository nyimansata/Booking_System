const mongoose = require("mongoose");

const lecturerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  email: String,
  department: String,
  subject: String,
  approved: Boolean,
});

module.exports = mongoose.model("Lecturer", lecturerSchema);
