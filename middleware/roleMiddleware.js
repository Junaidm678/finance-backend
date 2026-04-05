const allowedRoles = (...roles) => {
  return (req, res, next) => {
    // check if role is allowed or not
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};

module.exports = allowedRoles;
