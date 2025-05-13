const express = require("express");
const app = express();
const port = 3000;

// 解析 JSON 格式
app.use(express.json());

const todos = [
	{
		id: Date.now(),
		title: "學習 Express",
		completed: false,
		createdAt: Date(),
	},
	{
		id: Date.now() + 1,
		title: "學習 Node.js",
		completed: false,
		createdAt: Date(),
	},
];

// GET 取得
app.get("/todos", (req, res) => {
	res.json(todos);
});

// POST 新增待辦
app.post("/todos", (req, res) => {
	const title = req.body.title;

	if (!title) {
		return res.status(400).json({ error: "請輸入待辦事項" });
	}

	const newTodos = {
		id: Date.now(),
		title: title,
		completed: false,
		createdAt: Date(),
	};

	todos.push(newTodos);
	res.status(201).json({
		// 201 跟 200 的差異是 201 是建立新的資源
		message: "新增待辦事項成功",
		todos: newTodos,
	});
});

// PUT 更新待辦事項 //findIndex 陣列裡面資料的位置 find 陣列裡面id符合的資料
app.put("/todos/:id", (req, res) => {
	//const todoId = Number.parseInt(req.params.id);
	//const todoIndex = todos.findIndex((todo) => todo.id === todoId);
	//
	//if (todoIndex === -1) {
	//	return res.status(404).json({ message: "找不到該筆資料" });
	//}
	//
	//todos[todoIndex] = {
	//	...todos[todoIndex],
	//	completed: req.body.completed,
	//};
	//
	//res.json({
	//	message: "資料已更新",
	//	todo: todos[todoIndex],
	//});

	const id = req.params.id;
	const completed = req.body.completed;
	const todo = todos.find((todo) => todo.id === Number(id));
	todo.completed = completed;
	res.json(todo);
});

// DELETE //filter 過濾 取得沒有該筆資料的新陣列
app.delete("/todos/:id", (req, res) => {
	//	const todoId = Number.parseInt(req.params.id);
	//	const todoIndex = todos.findIndex((todo) => todo.id === todoId);
	//
	//	if (todoIndex === -1) {
	//		return res.status(404).json({ message: "找不到該筆資料" });
	//	}
	//
	//	todos.splice(todoIndex, 1);
	//	res.status(204).json({ message: `該筆資料 ${todoId}  已刪除` });

	//status code 204 沒有內容
	const id = req.params.id;
	todo = todos.filter((todo) => todo.id === Number(id));
	res.json({ message: `該筆資料 ${id}  已刪除` });
});

app.listen(port, () => {
	console.log(`伺服器運行在 http://localhost:${port}`);
});
