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

  dateTime: {
    type: Date,
    required: true,
  },
  approved: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Lecturer", lecturerSchema);
