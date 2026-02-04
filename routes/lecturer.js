const express = require("express");
const { protect } = require("../middlewares/auth");
const { authorize } = require("../middlewares/role");
const {
  getAllTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherById,
  uploadTeacherPic,
} = require("../controllers/teachers");

const router = express.Router();

router.get("/", getAllTeachers);

router.get("/:id", getTeacherById);

router.post("/", protect, authorize("Admin"), addTeacher);

router.patch("/:id", protect, authorize("Admin"), updateTeacher);

router.delete("/:id", protect, authorize("Admin"), deleteTeacher);

router.put("/:id/photo", uploadTeacherPic);

module.exports = router;
