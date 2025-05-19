// models/User.js
// 定義使用者 Schema  （類似於 SQL 中的 pgTable 定義）  pgTable = schema.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String, // 定義型態: 字串
		required: [true, "請輸入使用者名稱"], //設定  [ 此欄位是否必填 , 錯誤訊息]
		trim: true, // 去除前後空白
		unique: true, // 唯一性
		minlength: [3, "使用者名稱至少需要3個字"],
		maxlength: [10, "使用者名稱最多只能10個字"],
	},
	email: {
		type: String,
		required: [true, "請輸入email"],
		unique: true,
		match: [
			// 做驗證處理
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // 正則表達式 [ 此欄位是否符合正則表達式  , 錯誤訊息]
			"請輸入正確的email格式",
		],
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		select: false, // 查詢時預設不回傳此欄位
	},
	age: {
		type: Number,
		min: [0, "年齡不能為負數"],
		max: [120, "年齡不能超過 120"],
	},

	// 嵌套物件
	address: {
		street: String,
		city: String,
		zipCode: String,
		country: { type: String, default: "台灣" }, // 預設值
	},

	// 陣列
	hobbies: [String],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// 建立 model
const User = mongoose.model("User", userSchema);

// 匯出 model
module.exports = User;
