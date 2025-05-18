// src/db.js
const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");
const { todos } = require("./schema");

require("dotenv").config(); // 確保 dotenv 在這裡被載入 也就是.env

const pool = new Pool({
  // 這裡的 connectionString 是從 .env 檔案中讀取的
  // 你需要確保 .env 檔案中有 DATABASE_URL 這個變數
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

module.exports = { db, todos };
