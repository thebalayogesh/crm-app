CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(256) NOT NULL,
	"password_hash" varchar(500) NOT NULL,
	"age" integer,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "age_check1" CHECK ("users"."age" <= 120),
	CONSTRAINT "age_check2" CHECK ("users"."age" >= 0)
);
