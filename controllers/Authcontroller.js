const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registeruser = async (req,res) => {
  try {
    const { name, email, password } = req.body;

    const ifuserExists = await User.findOne({ email });

    if (ifuserExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashpassword,
    });

    res.status(200).json({
      message: "user registration successfull",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};



exports.userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // check password
    const isMatchpass = await bcrypt.compare(password, user.password);
    if (!isMatchpass) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // check status
    if (user.status === "inactive") {
      return res.status(403).json({ message: "User is inactive" });
    }

    // create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successfull",
      token
    });

  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};
