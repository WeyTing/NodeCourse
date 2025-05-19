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
