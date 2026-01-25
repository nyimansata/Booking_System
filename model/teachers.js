const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  department: {
    type: String,
    required: [true, "department is required"],
  },
  subject: {
    type: String,
    required: [true, "subject is required"],
  },
  dateTime: {
    type: Date,
    required: [true, "date and time is required"],
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Teacher", teacherSchema);
