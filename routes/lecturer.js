const express = require("express");
const { protect } = require("../middlewares/auth");
const { authorize } = require("../middlewares/role");
const {
  getAllLecturers,
  getLecturerById,
  addLecturer,
  updateLecturer,
  deleteLecturer,
  uploadLecturerPic,
} = require("../controllers/lecturer");

const router = express.Router();

router.get("/", getAllLecturers);

router.get("/:id", getLecturerById);

router.post("/", protect, authorize("Admin"), addLecturer);

router.patch("/:id", protect, authorize("Admin"), updateLecturer);

router.delete("/:id", protect, authorize("Admin"), deleteLecturer);

router.put("/:id/photo", uploadLecturerPic);
module.exports = router;
