const express = require("express");
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

router.post("/", addTeacher);

router.patch("/:id", updateTeacher);

router.delete("/:id", deleteTeacher);

router.put("/:id/photo", uploadTeacherPic);

module.exports = router;
