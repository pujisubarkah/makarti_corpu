CREATE TABLE "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255),
	"description" text,
	"instructor_id" integer
);
--> statement-breakpoint
CREATE TABLE "instructors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"bio" text
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email" varchar(255);