# 進階 SQL 查詢練習題

使用以下資料表完成練習：

```sql
CREATE TABLE departments (
    dept_id SERIAL PRIMARY KEY,
    dept_name VARCHAR(100),
    location VARCHAR(100)
);

CREATE TABLE employees (
    emp_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    dept_id INTEGER,
    salary DECIMAL(10,2),
    hire_date DATE
);

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(100),
    start_date DATE,
    end_date DATE,
    budget DECIMAL(10,2)
);

CREATE TABLE employee_projects (
    emp_id INTEGER,
    project_id INTEGER,
    hours_worked INTEGER,
    PRIMARY KEY (emp_id, project_id)
);

-- 插入測試資料
INSERT INTO departments (dept_name, location) VALUES
    ('研發部', '台北'),
    ('行銷部', '新竹'),
    ('人事部', '台北'),
    ('財務部', '新竹');

INSERT INTO employees (name, dept_id, salary, hire_date) VALUES
    ('張三', 1, 50000, '2020-01-15'),
    ('李四', 1, 55000, '2019-06-01'),
    ('王五', 2, 45000, '2021-03-10'),
    ('趙六', 2, 48000, '2020-11-20'),
    ('孫七', 3, 42000, '2021-01-05'),
    ('周八', 4, 46000, '2020-07-15');

INSERT INTO projects (project_name, start_date, end_date, budget) VALUES
    ('網站改版', '2023-01-01', '2023-06-30', 500000),
    ('APP開發', '2023-02-01', '2023-08-31', 800000),
    ('系統維護', '2023-03-01', '2023-12-31', 300000);

INSERT INTO employee_projects (emp_id, project_id, hours_worked) VALUES
    (1, 1, 120),
    (1, 2, 80),
    (2, 1, 100),
    (2, 3, 60),
    (3, 2, 90),
    (4, 2, 70),
    (5, 3, 50),
    (6, 3, 40);
```

## 練習 1：聚合函數與分組

1. 計算每個部門的平均薪資
2. 找出薪資最高的前 3 名員工
3. 計算每個部門的員工數量
4. 找出平均薪資超過 45000 的部門
5. 計算每個專案的總工時

## 練習 2：多表查詢

1. 使用 INNER JOIN 列出所有員工及其部門資訊
2. 使用 LEFT JOIN 列出所有部門及其員工（包含沒有員工的部門）
3. 使用 RIGHT JOIN 列出所有專案及其參與的員工（包含沒有員工的專案）
4. 使用 FULL OUTER JOIN 列出所有員工和專案的組合

## 練習 3：進階查詢技巧

1. 使用 UNION 合併兩個查詢：
   - 找出薪資大於 50000 的員工
   - 找出在台北辦公室的員工

2. 使用 INTERSECT 找出：
   - 同時參與多個專案的員工

3. 使用 EXCEPT 找出：
   - 在台北辦公室但薪資低於 45000 的員工

## 練習 4：複雜查詢

1. 計算每個專案的平均工時
2. 找出參與專案數最多的員工
3. 計算每個部門的專案參與情況
4. 找出預算最高且工時最長的專案
5. 計算每個員工的專案參與率和平均工時

## 解答提示

1. 聚合函數：
   - COUNT(), SUM(), AVG(), MAX(), MIN()
   - 可以配合 GROUP BY 使用

2. JOIN 語法：
   - INNER JOIN：只顯示符合條件的記錄
   - LEFT JOIN：顯示左表所有記錄
   - RIGHT JOIN：顯示右表所有記錄
   - FULL OUTER JOIN：顯示所有記錄

3. 集合運算：
   - UNION：合併查詢結果
   - INTERSECT：找出共同部分
   - EXCEPT：找出差異部分