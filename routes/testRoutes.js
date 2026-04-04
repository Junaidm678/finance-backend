const express = require("express")
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const allowedRoles = require("../middleware/roleMiddleware");

// only admin can access
router.get(
  "/admin",
  authMiddleware,
  allowedRoles("admin"),
  (req, res) => {
    res.json({
      message: "Admin access granted",
      user: req.user
    });
  }
);

// admin + analyst allowed
router.get(
  "/analyst",
  authMiddleware,
  allowedRoles("admin", "analyst"),
  (req, res) => {
    res.json({
      message: "Analyst access granted",
      user: req.user
    });
  }
);

module.exports = router;