const mongoose = require("mongoose");

const lecturerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  department: String,
  subject: String,
  availability: [Date],
  approved: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Lecturer", lecturerSchema);
