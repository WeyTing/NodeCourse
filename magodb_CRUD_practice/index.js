const express = require("express");
const app = express();
const port = 3000;
const todoRoutes = require("./routes/todo"); // 引入 todo路由
const connectDB = require("./config/db"); // 模組化 MongoDB 連接

require("dotenv").config();
connectDB(); // 連接到 MongoDB

app.use(express.json()); // 解析 JSON 請求主體
app.use("/api", todoRoutes);

app.listen(port, () => {
	console.log(`伺服器已啟動在 http://localhost:${port}`);
});
