const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const {
  createRecords,
  getRecords,
  updateRecord,
  deleteRecords
} = require("../controllers/Recordscontrollers");


// CREATE → admin + analyst
router.post("/", authMiddleware, allowRoles("admin", "analyst"), createRecords);

// GET → all logged users
router.get("/", authMiddleware, getRecords);

// UPDATE → admin + analyst
router.put("/:id", authMiddleware, allowRoles("admin", "analyst"), updateRecord);

// DELETE → admin only
router.delete("/:id", authMiddleware, allowRoles("admin"), deleteRecords);

module.exports = router;