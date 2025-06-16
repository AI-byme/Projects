const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { validateRegister, validateLogin } = require("../middlewares/validate");

console.log("register ===>", register); // Tambahkan ini
router.post("/register", validateRegister, register, (req, res) => {
  console.log("Register endpoint hit");
  res.status(200).json({ message: "Registration successful" });
});

router.post("/login", validateLogin, login, (req, res) => {
  console.log("Login endpoint hit");
  res.status(200).json({ message: "Login successful" });
});

module.exports = router;
