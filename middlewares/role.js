exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

// only for lecturer
exports.onlyLecturer = (req, res, next) => {
  console.log("🎓 ROLE CHECK:", req.user.role);

  if (req.user.role !== "Lecturer") {
    return res.status(403).json({
      message: "Access denied. Lecturer only.",
    });
  }
  next();
};
