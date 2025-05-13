const express = require("express");
const app = express();
const port = 3000;

// 解析 JSON 格式
app.use(express.json());

//nodemon 開發工具 避免重新啟動server抓資料
// 建立一個陣列來儲存使用者資料
const users = [
	{
		id: 1,
		phone: "0912345678",
	},
	{
		id: 2,
		phone: "0923456789",
	},
	{
		id: 4,
		name: "0ff",
	},
];

app.get("/", (req, res) => {
	res.send("歡迎來到首頁");
});

// GET 拿取資料
app.get("/api/users", (req, res) => {
	res.json(users);
});

// POST 新增
app.post("/api/users", (req, res) => {
	const newUser = {
		id: users.length + 1,
		phone: req.body.phone,
	};
	users.push(newUser);
	res.status(201).json({
		// 201 跟 200 的差異是 201 是建立新的資源
		message: "使用者已建立",
		user: newUser,
	});
});

// PUT 更新某筆資料
app.put("/api/users/:id", (req, res) => {
	const userId = Number.parseInt(req.params.id);
	const userIndex = users.findIndex((user) => user.id === userId);

	if (userIndex === -1) {
		return res.status(404).json({ message: "找不到該使用者" });
	}

	users[userIndex] = {
		...users[userIndex],
		phone: req.body.phone,
	};

	res.json({
		message: "使用者已更新",
		user: users[userIndex],
	});
});

// DELETE 刪除
app.delete("/api/users/:id", (req, res) => {
	const userId = Number.parseInt(req.params.id);
	const userIndex = users.findIndex((user) => user.id === userId);

	if (userIndex === -1) {
		return res.status(404).json({ message: "找不到該使用者" });
	}

	users.splice(userIndex, 1);
	res.json({ message: `使用者 ${userId} 已刪除` });
});

app.listen(port, () => {
	console.log(`伺服器運行在 http://localhost:${port}`);
});
