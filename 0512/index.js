//const math = require("./math");
//
//const result = math.add(2, 3);
//const result2 = math.subtract(9, 6);
////console.log(result);
////console.log(result2);
//
//const fs = require("fs").promises;
//
//async function demo() {
//	try {
//		const data = await fs.readFile("example.txt", "utf8");
//		console.log("實際內容：", data);
//	} catch (err) {
//		console.error("讀檔錯誤：", err);
//	}
//}
//
//demo();
//console.log("測試 async/await");
//
//async function readFilesParallel() {
//	try {
//		const [file1, file2] = await Promise.all([
//			fs.readFile("file1.txt", "utf8"),
//			fs.readFile("file2.txt", "utf8"),
//		]);
//		console.log("file1：", file1);
//		console.log("file2：", file2);
//	} catch (err) {
//		console.error("讀檔錯誤：", err);
//	}
//}
//
//readFilesParallel();
//console.log("測試 Promise");

//function readFileMock(filename, callback) {
//	setTimeout(() => {
//		const content = `Content of ${filename}`;
//		callback(null, content);
//	}, 1000);
//}
//
//readFileMock("file1.txt", "utf8", (err, data) => {
//	if (err) {
//		console.error("讀檔錯誤：", err);
//		return;
//	}
//	console.log("實際內容：", data);
//});

//function readFileMock(filename, callback) {
//	setTimeout(() => {
//		const content = `Content of ${filename}`;
//		callback(null, content);
//	}, 1000);
//}
//
//readFileMock("file1.txt", (err, data) => {
//	if (err) {
//		console.error("錯誤：", err);
//		return;
//	}
//	console.log("模擬內容：", data);
//});
//readFileMock("file2.txt", (err, data) => {
//	if (err) {
//		console.error("錯誤：", err);
//		return;
//	}
//	console.log("模擬內容：", data);
//});
//
//readFileMock("file3.txt", (err, data) => {
//	if (err) {
//		console.error("錯誤：", err);
//		return;
//	}
//	console.log("模擬內容：", data);
//});
//
//const fs = require("fs");
//
//fs.readFile("file1.txt", "utf8", (err, data) => {
//	if (err) {
//		console.error("讀檔錯誤：", err);
//		return;
//	}
//	console.log("實際內容：", data);
//});
//fs.readFile("file2.txt", "utf8", (err, data) => {
//	if (err) {
//		console.error("讀檔錯誤：", err);
//		return;
//	}
//	console.log("實際內容：", data);
//});
//fs.readFile("file3.txt", "utf8", (err, data) => {
//	if (err) {
//		console.error("讀檔錯誤：", err);
//		return;
////	}
////	console.log("實際內容：", data);
////});
//

//async/await 模擬 Promise 機制
//const fs = require("fs").promises;
//
//async function readFilesParallel() {
//	console.time("總時間");
//	console.log("開始讀取檔案...");
//	try {
//		await fs.readFile("file1.txt", "utf8");
//		console.log("讀取 file1.txt 完成");
//
//		await fs.readFile("file2.txt", "utf8");
//		console.log("讀取 file2.txt 完成");
//
//		await fs.readFile("file3.txt", "utf8");
//		console.log("讀取 file3.txt 完成");
//	} catch (err) {
//		console.error("讀檔錯誤：", err);
//	}
//	console.timeEnd("總時間");
//}
//
//readFilesParallel();

const path = require("path");

// 組合路徑
const fullPath = path.join(__dirname, "files", "file1.txt");
console.log("完整路徑:", fullPath);
console.log("副檔名:", path.extname(fullPath));
