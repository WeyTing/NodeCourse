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

app.put("/msg/:id", (req, res) => {
	const content = req.body.content;
	const id = req.params.id;
	const msg = msg.find((msg) => msg.id === Number(id));
	msg.content = content;
	res.json({
		status: "success",
	});
});

app.listen(port, () => {
	console.log(`伺服器運行在 http://localhost:${port}`);
});
