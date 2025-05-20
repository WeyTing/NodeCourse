const express = require("express");
const router = express.Router();
const db = require("../db/db");
const { users } = require("../db/schema");
const { eq } = require("drizzle-orm");

// 取得所有使用者
