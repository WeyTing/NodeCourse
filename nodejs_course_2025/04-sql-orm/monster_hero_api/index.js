const express = require("express");
const app = express();
const cors = require("cors"); // 跨域 cors
const heroesRouter = require("./src/routes/heroes");
const monstersRouter = require("./src/routes/monsters");

// app.use(cors())

app.use(
	cors({
		origin: "http://localhost:5173", // 設定允許的來源
		method: ["GET", "POST", "PUT", "DELETE"], // 設定允許的請求方法
	})
);

app.use(express.json());
app.use("/heroes", heroesRouter);
app.use("/monsters", monstersRouter);

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
