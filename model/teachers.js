const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "name is required"],
    unique: true,
  },
  email: {
    type: String,
    require: [true, "email is required"],
    unique: true,
  },
  department: {
    type: String,
    require: [true, "department is required"],
    unique: true,
  },
  subject: {
    type: String,
    require: [true, "subject is required"],
    unique: true,
  },
});

module.exports = mongoose.model("Teacher", teacherSchema);
