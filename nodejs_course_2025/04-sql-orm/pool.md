## Pool 是什麼？

![20250515214721](https://i.imgur.com/Dqo3tsY.png)

Pool 是 PostgreSQL 的「連線池管理員」。可以把它想成是一個「連線經理人」，專門幫你管理你和資料庫之間的「多條通道（連線）」

## 為什麼需要連線池？

每次要從資料庫讀資料或寫資料，就需要「打開一條連線」。但開一條連線會有成本，像是時間、資源等。

如果你每次都重新開連線，然後再關掉，這會超級沒效率，尤其在高流量的網站上。

所以，我們就會用 Pool：

- 預先幫你開好一批連線。

- 每次你要查資料，就借一條現成的連線用。

- 用完還給 Pool，下次別人也可以用。

```js
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

// 建立連線池（Pool）
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // 你 PostgreSQL 的連線字串
});

// 傳給 Drizzle
const db = drizzle(pool);
```