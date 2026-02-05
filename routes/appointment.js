const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const { onlyLecturer } = require("../middlewares/role");

const {
  bookAppointment,
  getAppointments,
  updateAppointment,
} = require("../controllers/appointments");

router.post("/book", protect, bookAppointment);
router.get("/lecturer", protect, onlyLecturer, getAppointments);
router.patch("/:id", protect, updateAppointment);

module.exports = router;
