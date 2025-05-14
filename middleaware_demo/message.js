const express = require("express");
const app = express();
const port = 3000;

// 解析 JSON 格式
app.use(express.json());

const msg = [
	{
		id: Date.now(),
		content: "Hello, World!",
		author: "John Doe",
	},
];

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.get("/msg", (req, res) => {
	res.json(msg);
});

app.post("/msg", (req, res) => {
	const content = req.body.content;
	const author = req.body.author;
	//防呆裝置
	if (!content || !author) {
		return res.status(400).json({ error: "缺少必要的參數" });
	}
	const newMsg = {
		id: Date.now(),
		content: content,
		author: author,
	};
	msg.push(newMsg);
	res.status(201).json({
		status: "success",
		msg: newMsg,
	});
});
//老師部分  findIndex 取代更新刪除(嚴謹) find 找牟筆資料(不嚴謹)
app.put("/msg/:id", (req, res) => {
	const id = req.params.id;
	const content = req.body.content;
	const msgIndex = msg.findIndex((msg) => msg.id === Number(id));
	if (msgIndex === -1) {
		return res.status(404).json({ message: "找不到該筆資料" });
	}
	msg[msgIndex] = {
		...msg[msgIndex],
		content: content,
	};
	res.json({
		message: "資料已更新",
		msg: msg[msgIndex],
	});
});

app.delete("/msg/:id", (req, res) => {
	const id = req.params.id;
	const msgIndex = msg.findIndex((msg) => msg.id === Number(id));
	if (msgIndex === -1) {
		return res.status(404).json({ message: "找不到該筆資料" });
	}
	msg.splice(msgIndex, 1);
	res.json({ message: `資料 ${id} 已刪除` });
});

app.listen(port, () => {
	console.log(`伺服器運行在 http://localhost:${port}`);
});
