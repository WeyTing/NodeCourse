const http = require("http");
const todos = [
	"吃飯",
	"睡覺",
	"做功課",
	"學習Node.js",
	"學習HTTP 模組",
	"完成作業",
];

// todos回傳代辦清單
// todos/count 回傳代辦清單數量
// heath 檢查伺服器是否運行
// 創建基本的 HTTP 伺服器
const server = http.createServer((req, res) => {
	// 設定回應標頭
	res.setHeader("Content-Type", "application/json");

	// 根據請求路徑回應不同內容
	if (req.url === "/") {
		res.writeHead(200);
		res.end(JSON.stringify({ message: "歡迎來到首頁" }));
	} else if (req.url === "/api/users") {
		res.writeHead(200);
		res.end(JSON.stringify({ users: ["使用者1", "使用者2"] }));
	} else if (req.url === "/api/todos") {
		res.writeHead(200);
		res.end(
			JSON.stringify({
				status: "ok",
				data: todos,
			})
		);
	} else if (req.url === "/api/todos/count") {
		res.writeHead(200);
		res.end(
			JSON.stringify({
				status: "ok",
				count: todos.length,
			})
		);
	} else {
		res.writeHead(404);
		res.end(JSON.stringify({ error: "找不到頁面" }));
	}
});

// 監聽 3000 port
server.listen(3000, () => {
	console.log("伺服器運行在 http://localhost:3000/");
});
