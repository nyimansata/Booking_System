const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Lecturer = require("../model/lecturer");

const Register = async (req, res) => {
  try {
    const { Name, Email, Password, role } = req.body;

    // Check required fields
    if (!Name || !Email || !Password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ Email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // hash password
    const hashPassword = await bcrypt.hash(req.body.Password, 10);

    const newUser = await User.create({
      Name,
      Email,
      Password: hashPassword,
      role,
    });

    // AUTO-CREATE lecturer profile
    if (role === "Lecturer") {
      await Lecturer.create({
        user: newUser._id,
        email: Email,
        department: "",
        subject: "",
        approved: true,
      });
    }

    // Create token
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User has successfully registered",
      token,
      newUser,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// controllers/auth.js
const Login = async (req, res) => {
  const { Email, Password } = req.body;

  const user = await User.findOne({ Email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(Password, user.Password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // if (user.role === "Lecturer") {
  //   const lecturer = await Lecturer.findOne({ email: user.Email });

  //   if (!lecturer) {
  //     return res.status(400).json({
  //       message: "Lecturer profile not created by admin",
  //     });
  //   }

  //   if (!lecturer.user) {
  //     lecturer.user = user._id;
  //     await lecturer.save();
  //   }
  // }

  if (user.role === "Lecturer") {
    const lecturer = await Lecturer.findOne({ email: user.Email });

    if (lecturer && !lecturer.user) {
      lecturer.user = user._id;
      await lecturer.save();
    }
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.SECRET_KEY,
    { expiresIn: "1d" },
  );

  res.json({
    token,
    role: user.role,
  });
};

// logout
const Logout = async (req, res) => {
  await res.status(200).json({ message: "User successfully logged out" });
};
module.exports = { Register, Login, Logout };
