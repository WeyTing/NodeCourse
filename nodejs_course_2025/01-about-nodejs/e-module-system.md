# Node.js 模組系統

Node.js 支援兩種主要的模組系統：CommonJS (CJS) 和 ECMAScript Modules (ESM)。這兩種系統各有其特點和使用場景。

## CommonJS (CJS)

CommonJS 是 Node.js 最早採用的模組系統，使用 `require()` 和 `module.exports` 來處理模組的導入和導出。

### 基本語法

```javascript
// math.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

module.exports = {
    add,
    subtract
};

// 或者使用 exports
exports.add = add;
exports.subtract = subtract;
```

```javascript
// main.js
const math = require('./math');

console.log(math.add(5, 3));      // 輸出: 8
console.log(math.subtract(5, 3)); // 輸出: 2
```

### 特點
- 同步載入
- 動態導入（可以在條件語句中導入）
- 使用 `require()` 函數
- 使用 `module.exports` 或 `exports` 導出

## ECMAScript Modules (ESM)

ESM 是 JavaScript 的官方模組系統，使用 `import` 和 `export` 語句。從 Node.js 12 開始，ESM 得到了更好的支援。

### 基本語法

```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// 或者使用
export default {
    add,
    subtract
};
```

```javascript
// main.js
import { add, subtract } from './math.js';

console.log(add(5, 3));      // 輸出: 8
console.log(subtract(5, 3)); // 輸出: 2
```

### 特點
- 靜態導入（必須在文件上面）
- 使用 `import` 和 `export` 語句
- 需要在 `package.json` 中設定 `"type": "module"`

## 如何選擇？

1. **使用 CommonJS 的情況**：
   - 需要動態導入
   - 使用較舊的 Node.js 版本
   - 需要與舊的程式碼相容

2. **使用 ESM 的情況**：
   - 開發新的專案
   - 需要與瀏覽器端 JavaScript 共用程式碼

## 在 package.json 中配置

```json
{
  "name": "my-project",
  "type": "module",  // 使用 ESM
  // 或者
  "type": "commonjs" // 使用 CommonJS（預設）
}
```

## 注意事項

1. 在同一個專案中可以混合使用兩種模組系統，但需要小心處理
2. CommonJS 模組不能直接使用 `import` 語句
3. ESM 模組不能直接使用 `require()` 