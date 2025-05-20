CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(100) NOT NULL,
	"email" char(100) NOT NULL,
	"age" integer,
	"avatar_url" varchar(255),
	"avatar_key" varchar(255),
	"avatat_last_modified" timestamp
);
