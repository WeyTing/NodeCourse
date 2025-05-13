# Express 錯誤處理

錯誤處理是 API 開發中非常重要的一環。本節將介紹如何在 Express 中處理各種錯誤情況。

## 基本錯誤處理

```javascript
// 404 處理
app.use((req, res) => {
  res.status(404).json({ error: '路徑錯誤' });
});
```

## 非同步錯誤處理

```javascript
// 使用 async/await
const getUserById = async (req, res) => {
  try {
    const userId = Number.parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (!user) {
      return res.status(404).json({ error: '找不到該使用者' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: '伺服器錯誤' });
  }
}

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await getUserById(req, res);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: '找不到該使用者' });
  }
});
```
