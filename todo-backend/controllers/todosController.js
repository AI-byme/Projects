const { validationResult } = require("express-validator");
// const { readJSONFile, writeJSONFile } = require("../utils/fileHelper");
const Todo = require("../models/Todo");
const { isValidObjectId } = require("mongoose");

// GET semua todo milik user

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil todo" });
  }
};

// POST todo baru
const createTodo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validasi gagal", errors: errors.array() });
  }

  try {
    const newTodo = await Todo.create({
      title: req.body.title,
      completed: false,
      userId: req.user.id,
    });

    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: "Gagal membuat todo", error: err.message });
  }
};

// PUT todo milik user
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo tidak ditemukan" });
    }

    if (todo.userId !== req.user.id) {
      return res.status(403).json({ message: "Akses ditolak" });
    }

    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;

    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengupdate todo" });
  }
};

// DELETE todo milik user
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo tidak ditemukan" });
    }

    if (todo.userId !== req.user.id) {
      return res.status(403).json({ message: "Akses ditolak" });
    }

    await todo.deleteOne();
    res.json({ message: "Todo berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus todo" });
  }
};

// Menandai todo sebagai selesai
const toggleTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "ID tidak valid" });
    }

    if (!todo) {
      return res.status(404).json({ message: "Todo tidak ditemukan" });
    }

    if (todo.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Akses ditolak" });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json(todo);
  } catch (error) {
    console.error("Toggle error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
};
