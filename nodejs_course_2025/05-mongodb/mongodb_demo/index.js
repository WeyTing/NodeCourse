const express = require("express");
const port = 3000;
require("dotenv").config();
const userRoutes = require("./routes/user"); // 引入 user 路由

const connectDB = require("./config/db"); // 模組化 MongoDB 連接
connectDB(); // 連接到 MongoDB

const app = express();
app.use(express.json()); // 解析 JSON 請求主體
app.use("/api", userRoutes); // 使用 user 路由

app.listen(port, () => {
	console.log(`伺服器已啟動在 http://localhost:${port}`);
});
