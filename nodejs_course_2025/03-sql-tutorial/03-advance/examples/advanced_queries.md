-- 建立示範資料表
```sql
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER,
    order_date DATE,
    total_amount DECIMAL(10,2)
);

CREATE TABLE order_items (
    item_id SERIAL PRIMARY KEY,
    order_id INTEGER,
    product_name VARCHAR(100),
    quantity INTEGER,
    price DECIMAL(10,2)
);

CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    join_date DATE
);
```

-- 插入測試資料
```sql
INSERT INTO customers (name, email, join_date) VALUES
    ('張小明', 'ming@example.com', '2023-01-15'),
    ('李小華', 'hua@example.com', '2023-02-20'),
    ('王小美', 'mei@example.com', '2023-03-10');

INSERT INTO orders (customer_id, order_date, total_amount) VALUES
    (1, '2023-04-01', 1500.00),
    (1, '2023-04-15', 2300.00),
    (2, '2023-04-02', 800.00),
    (3, '2023-04-05', 3200.00);

INSERT INTO order_items (order_id, product_name, quantity, price) VALUES
    (1, '筆記本', 2, 50.00),
    (1, '鉛筆', 5, 10.00),
    (2, '手機', 1, 2000.00),
    (2, '耳機', 1, 300.00),
    (3, '橡皮擦', 10, 5.00),
    (3, '尺', 2, 15.00),
    (4, '平板', 1, 3000.00),
    (4, '保護套', 1, 200.00);
```

-- 1. 函數示例
-- COUNT(): 計算訂單數量
```sql
SELECT COUNT(*) as total_orders FROM orders;
```

-- SUM(): 計算總銷售額
```sql
SELECT SUM(total_amount) as total_sales FROM orders;
```

-- AVG(): 計算平均訂單金額
```sql
SELECT AVG(total_amount) as average_order_amount FROM orders;
```

-- MAX(): 找出最高訂單金額
```sql
SELECT MAX(total_amount) as highest_order FROM orders;
```

-- MIN(): 找出最低訂單金額
```sql
SELECT MIN(total_amount) as lowest_order FROM orders;
```

-- 2. 分組與彙總示例
-- 使用 GROUP BY 按客戶分組，計算每個客戶的訂單總額
```sql
SELECT 
    c.name,
    COUNT(o.order_id) as order_count,
    SUM(o.total_amount) as total_spent,
    AVG(o.total_amount) as average_order_amount
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.name;
```

-- 使用 HAVING 篩選分組結果
-- 找出平均訂單金額超過 1000 的客戶
```sql
SELECT 
    c.name,
    AVG(o.total_amount) as average_order_amount
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.name
HAVING AVG(o.total_amount) > 1000;
```

-- 3. 多表查詢示例
-- INNER JOIN: 找出所有訂單及其商品明細
```sql
SELECT 
    o.order_id,
    c.name as customer_name,
    oi.product_name,
    oi.quantity,
    oi.price
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id;
```

-- LEFT JOIN: 找出所有客戶及其訂單（包含沒有訂單的客戶）
```sql
SELECT 
    c.name,
    o.order_id,
    o.total_amount
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id;
```

-- RIGHT JOIN: 找出所有訂單及其客戶（包含沒有客戶資訊的訂單）
```sql
SELECT 
    o.order_id,
    o.total_amount,
    c.name
FROM orders o
RIGHT JOIN customers c ON o.customer_id = c.customer_id;
```

-- FULL OUTER JOIN: 找出所有客戶和訂單的組合
```sql
SELECT 
    c.name,
    o.order_id,
    o.total_amount
FROM customers c
FULL OUTER JOIN orders o ON c.customer_id = o.customer_id;
```

-- UNION: 合併兩個查詢結果
-- 找出所有訂單金額大於 2000 或小於 1000 的訂單
```sql
SELECT order_id, total_amount, '高額訂單' as order_type
FROM orders
WHERE total_amount > 2000
UNION
SELECT order_id, total_amount, '低額訂單' as order_type
FROM orders
WHERE total_amount < 1000;
```

-- INTERSECT: 找出同時符合兩個條件的訂單
-- 找出在 4 月份且金額大於 1000 的訂單
```sql
SELECT order_id, total_amount
FROM orders
WHERE EXTRACT(MONTH FROM order_date) = 4
INTERSECT
SELECT order_id, total_amount
FROM orders
WHERE total_amount > 1000;
```

-- EXCEPT: 找出符合第一個條件但不符合第二個條件的訂單
-- 找出在 4 月份但不是高額訂單的訂單
```sql
SELECT order_id, total_amount
FROM orders
WHERE EXTRACT(MONTH FROM order_date) = 4
EXCEPT
SELECT order_id, total_amount
FROM orders
WHERE total_amount > 2000; 
```