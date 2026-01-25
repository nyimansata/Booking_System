const Teacher = require("../model/teachers");
const path = require("path");

/* ---------------- GET ALL TEACHERS ---------------- */
const getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    next(error);
  }
};

/* ---------------- GET TEACHER BY ID ---------------- */
const getTeacherById = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json(teacher);
  } catch (error) {
    next(error);
  }
};

/* ---------------- ADD TEACHER ---------------- */
const addTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ---------------- UPDATE TEACHER (APPROVE / EDIT) ---------------- */
const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ---------------- DELETE TEACHER ---------------- */
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ---------------- UPLOAD TEACHER PHOTO ---------------- */
const uploadTeacherPic = async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return res.status(404).json({ message: "Teacher not found" });
  }

  if (!req.files || !req.files.file) {
    return res.status(400).json({ message: "Please upload a file" });
  }

  const file = req.files.file;

  if (!file.mimetype.startsWith("image")) {
    return res.status(400).json({ message: "Please upload an image" });
  }

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return res.status(400).json({
      message: `Image must be smaller than ${process.env.MAX_FILE_UPLOAD}`,
    });
  }

  file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    await Teacher.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({ success: true, photo: file.name });
  });
};

module.exports = {
  getAllTeachers,
  getTeacherById,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  uploadTeacherPic,
};
