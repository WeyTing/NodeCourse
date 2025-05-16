# npm 套件管理

npm (Node Package Manager) 是 Node.js 的套件管理工具，用於安裝、分享和管理專案依賴。

## package.json 結構

`package.json` 是 Node.js 專案的核心文件，定義了專案的基本資訊和依賴關係。

### 基本結構

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A sample Node.js project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest",
    "dev": "nodemon index.js"
  },
  "keywords": ["node", "example"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "nodemon": "^2.0.22"
  }
}
```

### 重要欄位說明

1. **基本資訊**
   - `name`: 專案名稱
   - `version`: 專案版本
   - `description`: 專案描述
   - `main`: 專案入口
   - `author`: 建立者
   - `license`: 授權方式

2. **腳本命令**
   ```json
   "scripts": {
     "start": "node index.js",
     "dev": "nodemon index.js",
     "test": "jest",
     "build": "webpack"
   }
   ```
   - 可以通過 `npm run <script-name>` 執行
   - 常用指令如 `start`、`test` 可以直接用 `npm start`、`npm test` 執行

3. **依賴管理**
   - `dependencies`: 生產環境依賴
   - `devDependencies`: 開發環境依賴

## 套件安裝與移除

### 初始化專案

```bash
# 建立新的 package.json
npm init

# 使用預設值快速建立
npm init -y
```

### 安裝套件

```bash
# 安裝生產環境依賴
npm install express
npm i express
npm add express

# 安裝開發環境依賴
npm install --save-dev jest
npm i -D jest

# 安裝特定版本
npm install express@4.17.1

# 安裝最新版本
npm install express@latest

# 全域安裝
npm install -g nodemon
```

### 移除套件

```bash
# 移除生產環境依賴
npm uninstall express
npm remove express
npm rm express

# 移除開發環境依賴
npm uninstall --save-dev jest
npm remove -D jest

# 移除全域套件
npm uninstall -g nodemon
```

### 更新套件

```bash
# 更新所有套件
npm update

# 更新特定套件
npm update express

# 檢查過期套件
npm outdated
```

## 常用命令

```bash
# 查看已安裝的套件
npm list

# 查看特定套件
npm info express

# 清理緩存
npm cache clean --force

# 修復依賴問題
npm audit fix

# 安全檢查
npm audit
```

## 開發建議

1. **版本控制**
   - 將 `node_modules` 加入 `.gitignore`
   - 加入 `package.json` 和 `package-lock.json`

2. **依賴管理**
   - 定期更新依賴
   - 使用 `npm audit` 檢查安全問題
   - 區分開發依賴和生產依賴

3. **腳本管理**
   - 使用有意義的腳本名稱
   - 將常用指令加入 scripts

4. **專案結構**
   - 保持 `package.json` 整潔

## 注意事項

1. 不要手動修改 `package-lock.json`
2. 定期更新依賴以修復安全問題
3. 注意套件的授權方式
4. 避免安裝過多不必要的依賴 