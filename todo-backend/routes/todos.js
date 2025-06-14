const express = require("express");
const router = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
} = require("../controllers/todosController");

const authenticate = require("../middlewares/authMiddleware");
const {
  validateCreateTodo,
  validateUpdateTodo,
  validateDeleteTodo,
  validateCompletedTodo,
} = require("../middlewares/validate");

router.use(authenticate);

router.get("/", getTodos);
router.post("/", validateCreateTodo, createTodo);
router.put("/:id", validateUpdateTodo, updateTodo);
router.put("/:id/toggle", toggleTodo);

router.delete("/:id", validateDeleteTodo, deleteTodo);

module.exports = router;

// Route ini untuk mengelola todo list
// - GET: Mendapatkan semua todo
// - POST: Membuat todo baru
// - PUT: Mengupdate todo berdasarkan ID
// - DELETE: Menghapus todo berdasarkan ID
