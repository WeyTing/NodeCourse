const {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
} = require("drizzle-orm/pg-core");

const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(), // 標題 notnull 代表 必填
  completed: boolean("completed").default(false), // deafult 代表預設值
  createdAt: timestamp("created_at").defaultNow(),
});

module.exports = { todos };

//CREATE TABLE users (
//  id SERIAL PRIMARY KEY,
//  name TEXT NOT NULL,
//  created_at TIMESTAMP DEFAULT now()
//);
