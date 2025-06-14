const { body, param, validationResult } = require("express-validator");

// Middleware untuk tangani hasil validasi
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validasi register
const validateRegister = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username minimal 3 karakter"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
  handleValidation,
];

// Validasi login
const validateLogin = [
  body("username").notEmpty().withMessage("Username wajib diisi"),
  body("password").notEmpty().withMessage("Password wajib diisi"),
  handleValidation,
];

// Validasi buat todo
const validateCreateTodo = [
  body("title").notEmpty().withMessage("Title wajib diisi"),
  handleValidation,
];

// Validasi update todo
const validateUpdateTodo = [
  body("title")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Title tidak boleh kosong"),
  body("completed")
    .optional()
    .toBoolean()
    .isBoolean()
    .withMessage("Completed harus berupa boolean"),
  handleValidation,
];

// Validasi hapus todo
const validateDeleteTodo = [
  param("id").notEmpty().withMessage("ID wajib disediakan"),
  handleValidation,
];

module.exports = {
  validateRegister,
  validateLogin,
  validateCreateTodo,
  validateUpdateTodo,
  validateDeleteTodo,
};
