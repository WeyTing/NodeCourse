const {
	pgTable,
	serial,
	varchar,
	char,
	integer,
	timestamp,
} = require("drizzle-orm/pg-core");

// 使用者Table
const usersTable = pgTable("users", {
	id: serial().primaryKey().notNull(),
	username: varchar("username", { length: 100 }).notNull(),
	email: char({ length: 100 }).notNull(),
	age: integer(),
	avatar_url: varchar({ length: 255 }),
	avatar_key: varchar({ length: 255 }),
	avatat_last_modified: timestamp("avatat_last_modified", { mode: "date" }),
});

module.exports = {
	usersTable,
};
