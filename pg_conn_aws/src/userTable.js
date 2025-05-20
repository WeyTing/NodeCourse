const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const db = require("../db/db");
const { uploadFileToS3, deleteFileFromS3 } = require("./s3");
const { usersTable } = require("../db/schema");
const { eq } = require("drizzle-orm");
// 設定 multer 的存儲設定
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/"); // 儲存位置
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname); // 設定檔案名稱
	},
});

const upload = multer({ storage: storage }); // 初始化 multer 並傳入設定

//新增使用者
router.post("/post", async (req, res) => {
	const { username, email, age } = req.body;

	if (!username || !email) {
		return res.status(400).json({ message: "缺少必要的欄位" });
	}
	const newUser = {
		username: username.trim(),
		email: email.trim(),
		age: age ? parseInt(age) : null,
	};
	// res新增後的資料
	try {
		const result = await db.insert(usersTable).values(newUser);
		res.status(201).json(newUser);
	} catch (error) {
		console.error("新增使用者失敗:", error);
		res.status(500).json({ message: "新增使用者失敗" });
	}
});

// 取得所有使用者
router.get("/post", async (req, res) => {
	try {
		const rows = await db.select().from(usersTable);
		res.json(rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});
//取得單一使用者
router.get("/post/:id", async (req, res) => {
	try {
		const rows = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.id, req.params.id));
		res.json(rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// 刪除使用者
router.delete("/post/:id", async (req, res) => {
	try {
		await db.delete(usersTable).where(eq(usersTable.id, req.params.id));
		res.json({ message: "成功刪除" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// 上傳大頭貼的路由
router.post("/upload/:id", upload.single("image"), async (req, res) => {
	try {
		// 確保檔案存在
		if (!req.file) {
			return res.status(400).json({ message: "請上傳大頭貼圖片" });
		}

		// 從請求中取得使用者資料，並處理檔案
		const { userId } = req.body; // 假設這是用來識別使用者的 ID
		const avatarFile = req.file; // multer 上傳的檔案

		// 設定 S3 上傳檔案的 Key
		const avatarKey = `users/${userId}/avatars/${avatarFile.filename}`;
		const filePath = avatarFile.path; // 本地暫存的檔案路徑

		// 上傳檔案到 S3
		const bucketName = process.env.S3_BUCKET_NAME;
		const data = await uploadFileToS3(filePath, bucketName, avatarKey);

		// 確定上傳成功後，儲存檔案的 URL 和 Key 到資料庫
		const avatarUrl = `https://${bucketName}.s3.amazonaws.com/${avatarKey}`;

		// 更新資料庫中的使用者資料
		await db
			.update(usersTable)
			.set({ avatar_url: avatarUrl, avatar_key: avatarKey })
			.where(eq(usersTable.id, req.params.id));

		// 回應成功訊息
		res.status(200).json({ message: "大頭貼上傳成功", avatarUrl });
	} catch (error) {
		console.error("上傳大頭貼失敗:", error);
		res.status(500).json({ message: "上傳大頭貼失敗", error });
	}
});

module.exports = router;
