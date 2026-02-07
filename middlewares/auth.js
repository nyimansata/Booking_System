const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log("🔐 TOKEN RECEIVED:", token ? "YES" : "NO");

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("🔓 TOKEN DECODED:", decoded);

    req.user = await User.findById(decoded.id);
    console.log("👤 USER FROM TOKEN:", req.user);

    if (!req.user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    next();
  } catch (err) {
    console.error("JWT ERROR:", err.message);
    return res
      .status(401)
      .json({ message: "Not authorized, token invalid or expired" });
  }
};
