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
	id: serial("id").primaryKey().notNull(),
	username: varchar("username", { length: 100 }).notNull(),
	email: varchar("email", { length: 100 }).notNull(),
	age: integer("age"),
	avatar_url: varchar("avatar_url", { length: 255 }),
	avatar_key: varchar("avatar_key", { length: 255 }),
});

module.exports = {
	usersTable,
};
