require("dotenv").config();
const fs = require("fs");
const {
	S3Client,
	PutObjectCommand,
	DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

// 設定 AWS S3 客戶端
const s3Client = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

// 上傳檔案至 S3
async function uploadFileToS3(filePath, bucketName, key) {
	const fileStream = fs.createReadStream(filePath);

	const uploadParams = {
		Bucket: bucketName,
		Key: key,
		Body: fileStream,
		ContentType: "image/jpeg", // 根據你的檔案格式設定
	};

	try {
		const data = await s3Client.send(new PutObjectCommand(uploadParams));
		console.log("文件上傳成功", data);
		return data;
	} catch (err) {
		console.error("上傳檔案到 S3 失敗:", err);
		throw err;
	}
}

// 刪除 S3 中的檔案
async function deleteFileFromS3(bucketName, key) {
	const deleteParams = {
		Bucket: bucketName,
		Key: key,
	};

	try {
		const data = await s3Client.send(new DeleteObjectCommand(deleteParams));
		console.log("文件刪除成功", data);
		return data;
	} catch (err) {
		console.error("刪除檔案從 S3 失敗:", err);
		throw err;
	}
}

// 生成檔案的預簽名 URL
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
async function generateSignedUrl(bucketName, key) {
	const command = new GetObjectCommand({
		Bucket: bucketName,
		Key: key,
	});

	const signedUrl = await getSignedUrl(s3Client, command, {
		expiresIn: 3600, // 預簽名 URL 會在一小時後過期
	});

	return signedUrl;
}

module.exports = {
	uploadFileToS3,
	deleteFileFromS3,
	generateSignedUrl,
};
