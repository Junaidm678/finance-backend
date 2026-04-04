const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // check if token exists
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // extract token (Bearer token)
    const token = authHeader.split(" ")[1];

    // verify token
    const decode = jwt.verify(token, process.env.JWT_KEY);

    // attach user info to request
    req.user = decode;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;