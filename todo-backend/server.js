const app = require("./app");
require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");

app.use(cors({
  origin: ["http://localhost:5173", "https://projects-production-0fac.up.railway.app"],
}));



const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  });
});
