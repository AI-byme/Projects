const app = require("./app");
require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:5173", "https://ai-009.my.id"], // sesuaikan origin
    credentials: true, // jika kamu kirim cookie/token
  })
);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  });
});
