const app = require("./app");
require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");

app.use(cors()); // Allow all origins (sementara saja)




const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  });
});
