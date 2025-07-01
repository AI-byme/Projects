const express = require("express");
const app = express();
require("dotenv").config();
const authRoutes = require("./routes/auth");
const todosRoutes = require("./routes/todos");
const cors = require("cors");

// Middleware parsing JSON
app.use(express.json());

// Middleware CORS (penting!)
app.use(cors({
  origin: ["http://localhost:5173", "https://projects-production-0fac.up.railway.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Tangani preflight request
app.options("*", cors());

// Logging sederhana
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routing
app.use("/api/auth", authRoutes);
app.use("/api/todos", todosRoutes);

// Error handler (basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Terjadi kesalahan di server" });
});

module.exports = app;
