// 這個檔案主要是用來操作 S3 的，包含上傳、刪除、列出檔案等功能
require("dotenv").config();
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
