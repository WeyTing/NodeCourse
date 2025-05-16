const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");
dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
