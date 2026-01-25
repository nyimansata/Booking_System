const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

const Login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    // Check if user exists
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    // Send response
    res.status(200).json({
      message: "User successfully logged in",
      token,
      // user,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { Register, Login };
