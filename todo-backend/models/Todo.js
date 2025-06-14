const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
// Untuk membuat model Todo, kita menggunakan mongoose.Schema untuk mendefinisikan struktur data yang akan disimpan dalam koleksi "todos" di MongoDB.
