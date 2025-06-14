const fs = require("fs");
const path = require("path");

// Fungsi baca file JSON
const readJSONFile = (filePath) => {
  try {
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, "[]", "utf-8");
      return [];
    }
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
};

// Fungsi tulis file JSON
const writeJSONFile = (filePath, data) => {
  try {
    fs.writeFileSync(
      path.join(__dirname, "..", filePath),
      JSON.stringify(data, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Error writing file:", error);
  }
};

module.exports = {
  readJSONFile,
  writeJSONFile,
};
