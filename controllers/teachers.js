const Teacher = require("../model/teachers");
const AsyncHandler = require("../middlewares/async");
const path = require("path");

// get all teachers
const getAllTeachers = async (req, res, next) => {
  try {
    const allTeachers = await Teacher.find();

    if (!addTeacher) {
      res.status(400).send("Teacher is found");
    }

    res.send(allTeachers);
  } catch (error) {
    // res.status(500).send(error.message);
    next(error);
  }
};

//get teacher by id
const getTeacherById = async (req, res, next) => {
  try {
    const getTeacherById = await Teacher.findById(req.params.id);

    if (!getTeacherById) {
      res.status(400).send("no teacher with this Id found");
    }

    res.status(200).send(getTeacherById);
  } catch (error) {
    // res.status(500).send(error.message);
    next(error);
  }
};

// create a teacher
const addTeacher = async (req, res) => {
  try {
    const createTeacher = await Teacher.create(req.body);

    if (!createTeacher) {
      res.status(400).send("can not add this teacher");
    }

    res.status(201).send(createTeacher);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// update teacher
const updateTeacher = async (req, res) => {
  try {
    const updateTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!updateTeacher) {
      res.status(400).send("can not update this teacher");
    }

    res.send(updateTeacher);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// delete teacher
const deleteTeacher = async (req, res) => {
  try {
    const destroyTeacher = await Teacher.findByIdAndDelete(req.params.id);

    if (!destroyTeacher) {
      return res.status(400).send("can not delete this teacher");
    }

    res.send(destroyTeacher);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// file upload
const uploadTeacherPic = async (req, res) => {
  const getTeacherById = await Teacher.findById(req.params.id);

  if (!getTeacherById) {
    return res.status(400).send("no teacher with this Id found");
  }

  if (!req.files) {
    return res.status(400).send("upload picture");
  }

  const file = req.files.file;

  // check if the file is image or not
  if (!file.mimetype.startsWith("image")) {
    return res.status(400).send("please upload image");
  }

  // check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return res
      .status(400)
      .send(`please upload image less than ${process.env.MAX_FILE_UPLOAD}`);
  }

  // create custom file
  file.name = `photo_${Teacher._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (error) => {
    if (error) {
      return res
        .status(400)
        .send(
          `problem with file upload , ${process.env.FILE_UPLOAD_PATH} ${error.message}`,
        );
    }

    await Teacher.findByIdAndUpdate(req.params.id, { photo: file.name });
    console.log(file.name);
  });
};

module.exports = {
  getAllTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherById,
  uploadTeacherPic,
};
