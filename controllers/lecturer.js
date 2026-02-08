const Lecturer = require("../model/lecturer");
const path = require("path");

/* ---------------- GET ALL TEACHERS ---------------- */
const getAllLecturers = async (req, res, next) => {
  try {
    const lecturers = await Lecturer.find();
    res.status(200).json(lecturers);
  } catch (error) {
    next(error);
  }
};

const getLecturers = async (req, res) => {
  const lecturers = await Lecturer.find().populate("user", "Name Email");

  res.status(200).json(lecturers);
};

/* ---------------- GET TEACHER BY ID ---------------- */
const getLecturerById = async (req, res, next) => {
  try {
    const lecturer = await Lecturer.findById(req.params.id);
    if (!lecturer) {
      return res.status(404).json({ message: "Lecturer not found" });
    }

    res.status(200).json(lecturer);
  } catch (error) {
    next(error);
  }
};

/* ---------------- ADD LECTURER ---------------- */
// const addLecturer = async (req, res) => {
//   try {
//     const lecturer = await Lecturer.create(req.body);
//     res.status(201).json(lecturer);
//   } catch (error) {
//     console.error("MONGOOSE ERROR:", error);

//     res.status(400).json({ message: error.message });
//   }
// };

const addLecturer = async (req, res) => {
  try {
    const lecturer = await Lecturer.create({
      name: req.body.name,
      email: req.body.email,
      department: req.body.department,
      subject: req.body.subject,
      dateTime: req.body.dateTime,
      approved: false, // force pending
      user: null, // explicitly null
    });

    res.status(201).json(lecturer);
  } catch (error) {
    console.error("MONGOOSE ERROR:", error);
    res.status(400).json({ message: error.message });
  }
};

/* ---------------- UPDATE LECTURER (APPROVE / EDIT) ---------------- */
const updateLecturer = async (req, res) => {
  try {
    const lecturer = await Lecturer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!lecturer) {
      return res.status(404).json({ message: "Lecturer not found" });
    }

    res.status(200).json(lecturer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ---------------- DELETE LECTURER ---------------- */
const deleteLecturer = async (req, res) => {
  try {
    const lecturer = await Lecturer.findByIdAndDelete(req.params.id);
    if (!lecturer) {
      return res.status(404).json({ message: "Lecturer not found" });
    }

    res.status(200).json({ message: "Lecturer deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ---------------- UPLOAD LECTURER PHOTO ---------------- */
const uploadLecturerPic = async (req, res) => {
  const lecturer = await Lecturer.findById(req.params.id);

  if (!lecturer) {
    return res.status(404).json({ message: "Lecturer not found" });
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
  getAllLecturers,
  getLecturerById,
  addLecturer,
  updateLecturer,
  deleteLecturer,
  uploadLecturerPic,
};
