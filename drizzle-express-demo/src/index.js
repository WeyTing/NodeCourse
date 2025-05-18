// src/index.js
const express = require("express");
const { db, todos } = require("./db");
const cors = require("cors");
const { eq } = require("drizzle-orm");
const app = express();
app.use(express.json());

app.use(cors()); // 設定 CORS 權限
app.use(express.urlencoded({ extended: true })); // 如果要在前端處理資料 需要cors

const initTodos = [
  { id: 1, title: "Learn Node.js", completed: false },
  { id: 2, title: "Learn Express", completed: false },
];

async function init() {
  const tableExists = await db.select().from(todos);
  if (tableExists.length == 0) {
    try {
      await db.insert(todos).values(initTodos);
      // 這裡的 db 是從 db.js 中引入的 drizzle 實例
      // 這裡的 users 是從 schema.js 中引入的 users 表格結構
      console.log("Table created or already exists");
    } catch (error) {
      console.error("Error creating table:", error);
    }
  }
}

app.get("/todos", async (req, res) => {
  try {
    //SELECT * FROM todos
    // 這裡的 allTodos 是從資料庫中取得的所有 todos
    const allTodos = await db.select().from(todos);
    res.json(allTodos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/todos", async (req, res) => {
  const { title } = req.body;
  try {
    // INSERT INTO todos (title) VALUES (title)
    const [newTodo] = await db.insert(todos).values({ title }).returning();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    // UPDATE todos SET title = title, completed = completed WHERE id = id
    const [updatedTodo] = await db
      .update(todos)
      .set({ title, completed })
      .where(eq(todos.id, Number(id)))
      .returning();
    res.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // DELETE FROM todos WHERE id = id
    const [deletedTodo] = await db
      .delete(todos)
      .where(eq(todos.id, Number(id)))
      .returning();
    res.json(deletedTodo);
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
  init();
  // 初始化資料庫
});
