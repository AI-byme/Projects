const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");
require("dotenv").config();

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validasi gagal", errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    // Cek apakah user sudah ada
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username sudah digunakan" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan ke MongoDB
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Registrasi berhasil" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Terjadi kesalahan di server" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Cari user di MongoDB
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: "Username tidak ditemukan" });

    // Bandingkan password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Password salah" });

    // Buat token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Terjadi kesalahan di server" });
  }
};

module.exports = {
  register,
  login,
};
