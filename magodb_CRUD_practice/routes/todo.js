const express = require("express");
const router = express.Router();
const Todo = require("../models/Todolist.js");

router.get("/todo", async (req, res) => {
	try {
		// 類似pg SELECT * FROM todos
		// const allTodos = await db.select().from(todos);
		const result = await Todo.find();
		res.status(200).json({
			success: true,
			data: result,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			error: err.message,
		});
	}
});
router.get("/todo/:id", async (req, res) => {
	try {
		// 類似pg SELECT * FROM todos WHERE id = 1
		// const allTodos = await db.select().from(todos).where({ id: 1 });
		const result = await Todo.findById(req.params.id);
		res.status(200).json({
			success: true,
			data: result,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			error: err.message,
		});
	}
});

router.post("/todo", async (req, res) => {
	try {
		// 類似pg INSERT INTO todos (content) VALUES ('todo')
		// const allTodos = await db.insert({ content: "todo" }).into(todos);
		const result = await Todo.create(req.body);
		res.status(200).json({
			success: true,
			data: result,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			error: err.message,
		});
	}
});
router.put("/todo/:id", async (req, res) => {
	try {
		// 類似pg UPDATE todos SET content = 'todo' WHERE id = 1
		// const allTodos = await db.update({ content: "todo" }).where({ id: 1 }).into(todos);
		const result = await Todo.findByIdAndUpdate(req.params.id, req.body, {
			new: true, // 回傳更新後的資料
		});
		res.status(200).json({
			success: true,
			data: result,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			error: err.message,
		});
	}
});
router.delete("/todo/:id", async (req, res) => {
	try {
		// 類似pg DELETE FROM todos WHERE id = 1
		const result = await Todo.findByIdAndDelete(req.params.id);
		res.status(200).json({
			success: true,
			data: 刪除成功,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			error: err.message,
		});
	}
});

module.exports = router;
