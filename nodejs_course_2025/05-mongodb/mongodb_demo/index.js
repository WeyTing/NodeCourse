const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();

const connectDB = require("./config/db"); // 模組化 MongoDB 連接
connectDB(); // 連接到 MongoDB

app.listen(port, () => {
	console.log(`運作在 ${port}`);
});
