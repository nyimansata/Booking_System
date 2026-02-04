const addAppointment = (req, res) => {
  res.send("Appointment added");
};

const getAppointments = (req, res) => {
  res.send("Get all appointments");
};

const rejectAppointment = (req, res) => {
  res.send("Appointment rejected");
};

module.exports = { addAppointment, getAppointments, rejectAppointment };
