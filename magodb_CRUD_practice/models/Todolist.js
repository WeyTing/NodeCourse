//設定 表格結構
// 1. 引入 mongoose
// 2. 定義 Schema const todolistSchema = new mongoose.Schema({...});
// 3. 定義 Model
// 4. 匯出 Model module.exports = todos;
// 5. 在 todo.js 中引入 Model
const mongoose = require("mongoose");

const todolistSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
		trim: true, // 去除前後空格
		unique: true,
	},
	isCompleted: {
		type: Boolean,
		default: false,
	},
	createAt: {
		type: Date,
		default: Date.now,
	},
});

const todos = mongoose.model("todos", todolistSchema);

module.exports = todos;

//
