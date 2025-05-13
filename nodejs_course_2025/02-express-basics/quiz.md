使用記憶體儲存的簡易留言板 API 實作

### API 使用範例

```bash
# 取得所有留言
GET http://localhost:3000/api/messages

# 新增留言
POST http://localhost:3000/api/messages
Content-Type: application/json

{
  "content": "Hello World!",
  "author": "John"
}

# 更新留言
PUT http://localhost:3000/api/messages/123
Content-Type: application/json

{
  "content": "Updated message"
}

# 刪除留言
DELETE http://localhost:3000/api/messages/123
``` 