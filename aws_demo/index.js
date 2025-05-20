const express = require("express");
require("dotenv").config();
const app = express();
const port = 3000;
const { createInterface } = require("node:readline/promises");
const {
	S3Client,
	PutObjectCommand,
	CreateBucketCommand,
	DeleteObjectCommand,
	DeleteBucketCommand,
	paginateListObjectsV2,
	GetObjectCommand,
	ListObjectsV2Command,
} = require("@aws-sdk/client-s3");
const multer = require("multer");
// multer 主要先將檔案儲存在本地端，再上傳到 S3
const upload = multer({
	dest: "uploads/",
	limits: {
		fileSize: 1024 * 1024 * 2, // 2MB
	},
	fileFilter: (req, file, cb) => {
		if (file.mimetype.startsWith("image/")) {
			// 判斷檔案類型是否為圖片
			cb(null, true);
		} else {
			return cb(new Error("只允許上傳 JPEG 或 PNG 格式的圖片"), false);
		}
	},
});
const fs = require("node:fs"); // node:fs 是 Node.js 內建的方法，無需安裝
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// S3 Client 設定
const s3 = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});
app.get("/files", async (req, res) => {
	// 取得 S3 Bucket 中的檔案列表
	const command = new ListObjectsV2Command({
		Bucket: process.env.S3_BUCKET_NAME,
	});
	try {
		const buckName = process.env.S3_BUCKET_NAME;
		const region = process.env.AWS_REGION;
		const data = await s3.send(command);
		if (data.Contents) {
			const files = data.Contents.map((file) => ({
				key: file.Key,
				lastModified: file.LastModified,
				size: file.Size,
				url: `https://${buckName}.s3.${region}.amazonaws.com/${file.Key}`,
			}));
			res.json(files);
		} else {
			res.json([]);
		}
	} catch (err) {
		console.error("Error listing files:", err);
		res.status(500).send("Error listing files");
	}
});
//  single("image") 代表上傳的檔案名稱為 image == postman form-data 的 key 名稱
app.post("/upload", upload.single("image"), async (req, res) => {
	// 使用者上傳檔案
	const file = req.file;

	if (!file) {
		return res.status(400).send("沒有上傳檔案");
	}

	const fileKey = `${Date.now()}-${file.originalname}`; // 時間戳記+原始檔名
	const fileStream = fs.createReadStream(file.path); // 	從本地端暫存資料夾讀取檔案

	// S3 上傳參數

	const uploadParams = {
		Bucket: process.env.S3_BUCKET_NAME, // Bucket: S3 的 Bucket 名稱
		Key: fileKey, // Key: S3 上傳後的檔案名稱
		Body: fileStream, // Body: 上傳的檔案內容
		ContentType: file.mimetype, // ContentType: 上傳檔案的類型
	};

	try {
		await s3.send(new PutObjectCommand(uploadParams));
		fs.unlinkSync(file.path); // 刪除本地端暫存檔案

		// 生成預簽名 URL
		const command = new GetObjectCommand({
			Bucket: process.env.S3_BUCKET_NAME,
			Key: fileKey,
		});

		const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }); // 預簽名 URL 有效時間 1 小時 3600 秒
		const buckNmae = process.env.S3_BUCKET_NAME;
		const region = process.env.AWS_REGION;
		const publicUrl = `https://${buckNmae}.s3.${region}.amazonaws.com/${fileKey}`; // S3 公開 URL

		res.json({
			message: "上傳成功",
			imageUrl: publicUrl,
			signedUrl: signedUrl,
		});
	} catch (err) {
		console.error("S3 Upload Error:", err);
		res.status(500).send("上傳失敗");
	}
});
app.delete("/delete/:key", async (req, res) => {
	const key = req.params.key;

	const deleteParams = {
		Bucket: process.env.S3_BUCKET_NAME,
		Key: key,
	};

	try {
		await s3.send(new DeleteObjectCommand(deleteParams));
		res.json({
			message: `刪除成功  ${key}`,
		});
	} catch (err) {
		console.error("S3 Delete Error:", err);
		res.status(500).send("刪除失敗");
	}
});

app.listen(port, () => {
	console.log(`伺服器運行在 http://localhost:${port}`);
});
