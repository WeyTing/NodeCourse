const express = require("express"); //
const app = express(); //賦予變數取用它
const port = 3000; //建立伺服器位置

//api請求紀錄系統
const logs = [];
const logMiddleware = (req, res, next) => {
	const startTime = Date.now();
	res.on("finish", () => {
		const endTime = Date.now();
		const duration = endTime - startTime;
		const log = {
			timestamp: new Date().toISOString(),
			method: req.method,
			url: req.url,
			statusCode: res.statusCode,
			duration: `${duration}ms`,
		};
		logs.push(log);
	});
	next();
};
const authMiddleware = (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) {
		return res.status(401).json({ error: "未提供認證 token" });
	}
	// 驗證 token 邏輯
	next();
};

app.use(authMiddleware);
app.use(logMiddleware);

app.get("/", authMiddleware, (req, res) => {
	res.send("Hello World");
});

app.get("/api/logs", (req, res) => {
	res.json({ logs });
});

app.post("/api/users", (req, res) => {
	res.json({ message: "API 請求成功" });
});

//實作一個 API 請求記錄系統，需要包含以下功能：
//
//記錄所有 API 請求的詳細資訊
//計算請求處理時間
//將記錄儲存在記憶體中
//提供 API 來查詢記錄
//實作提示
//建立一個自定義 middleware 來記錄請求
//使用陣列儲存記錄
//實作查詢記錄的 API
//處理時間可以用 Date.now()
//res.on('finish', () => { /* 可在這裡執行回應結束應該做的邏輯 */ })

app.listen(port, () => {
	console.log(`伺服器運行在 http://localhost:${port}`);
});
