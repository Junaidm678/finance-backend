const express = require("express");
const router = express.Router();

const { registeruser, userlogin } = require("../controllers/Authcontroller");

router.post("/register", registeruser);
router.post("/login", userlogin);

module.exports = router;