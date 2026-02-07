const Appointment = require("../model/appointment");
const Lecturer = require("../model/lecturer");

/* STUDENT BOOK APPOINTMENT */
const bookAppointment = async (req, res) => {
  const { lecturerId, dateTime, message } = req.body;

  // Try as Lecturer ID first
  let lecturer = await Lecturer.findById(lecturerId);

  // If not found, try as User ID
  if (!lecturer) {
    lecturer = await Lecturer.findOne({ user: lecturerId });
  }

  if (!lecturer) {
    return res.status(404).json({ message: "Lecturer profile not found" });
  }

  // logging for debugging
  console.log("📩 RAW req.body:", req.body);
  console.log("🆔 lecturerId received:", lecturerId);
  console.log("🧾 All lecturers in DB:", await Lecturer.find());

  const appointment = await Appointment.create({
    student: req.user._id,
    lecturer: lecturer._id,
    dateTime,
    message,
  });

  res.status(201).json(appointment);
};

/* LECTURER GET THEIR APPOINTMENTS */
const getAppointments = async (req, res) => {
  console.log("getAppointments HIT");
  console.log("Logged-in user ID:", req.user._id);

  const lecturer = await Lecturer.findOne({
    user: req.user._id,
  });

  console.log("🎓 Lecturer found:", lecturer);

  if (!lecturer) {
    return res.status(404).json({
      message: "Lecturer profile not linked to this account",
    });
  }

  const appointments = await Appointment.find({
    lecturer: lecturer._id,
  }).populate("student", "Name Email");

  console.log("Appointments found:", appointments.length);

  res.status(200).json(appointments);
};

/* APPROVE / REJECT */
const updateAppointment = async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true },
  );

  res.json(appointment);
};

module.exports = { bookAppointment, getAppointments, updateAppointment };
