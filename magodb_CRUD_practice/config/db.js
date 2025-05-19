// MongoDB 連接配置文件
// 使用 mongoose 連接 MongoDB Atlas
// 1. 引入 mongoose
// 2. 引入 dotenv
// 3. 設定 MongoDB 連接字串 const conn = await mongoose.connect(process.env.MONGODB_URI);
// 4. 匯出 connectDB 函式 module.exports = connectDB;
// 5. 在 index.js 中引入 connectDB 函式

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
	try {
		// 使用你的 MongoDB Atlas 連接字串
		const conn = await mongoose.connect(process.env.MONGODB_URI);

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (err) {
		console.error(`Error: ${err.message}`);
	}
};

module.exports = connectDB;
