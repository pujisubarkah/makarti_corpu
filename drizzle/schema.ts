import { pgTable, foreignKey, uuid, varchar, integer, boolean, timestamp, unique, text, jsonb, serial, check, char, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const responderRole = pgEnum("responder_role", ['admin', 'moderator', 'responder'])


export const courseInfo = pgTable("course_info", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	courseId: uuid("course_id").notNull(),
	level: varchar({ length: 50 }).notNull(),
	duration: integer().notNull(),
	language: varchar({ length: 50 }).notNull(),
	mode: varchar({ length: 50 }).notNull(),
	certificate: boolean().default(false),
	mobileFriendly: boolean("mobile_friendly").default(true),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.courseId],
			foreignColumns: [courses.id],
			name: "course_info_course_id_courses_id_fk"
		}),
]);

export const courses = pgTable("courses", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: text().notNull(),
	slug: text().notNull(),
	description: text(),
	thumbnailUrl: text("thumbnail_url"),
	instructorId: uuid("instructor_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	isPublished: boolean("is_published").default(false).notNull(),
	competencyId: integer("competency_id"),
}, (table) => [
	foreignKey({
			columns: [table.instructorId],
			foreignColumns: [users.id],
			name: "courses_instructor_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.competencyId],
			foreignColumns: [competencies.id],
			name: "courses_competency_id_fkey"
		}),
	unique("courses_slug_unique").on(table.slug),
]);

export const notifications = pgTable("notifications", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	pesan: text().notNull(),
	dibaca: boolean().default(false).notNull(),
	createdBy: uuid("created_by").notNull(),
});

export const courseSections = pgTable("course_sections", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	courseId: uuid("course_id").notNull(),
	title: text().notNull(),
	order: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.courseId],
			foreignColumns: [courses.id],
			name: "course_sections_course_id_courses_id_fk"
		}),
]);

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	email: text().notNull(),
	passwordHash: text("password_hash").notNull(),
	fullName: text("full_name").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	roleId: integer("role_id").notNull(),
	nip: varchar({ length: 64 }),
	isActive: boolean("is_active").default(true).notNull(),
	avatarSeed: text("avatar_seed"),
}, (table) => [
	foreignKey({
			columns: [table.roleId],
			foreignColumns: [roles.id],
			name: "users_role_id_fkey"
		}),
	foreignKey({
			columns: [table.roleId],
			foreignColumns: [roles.id],
			name: "users_role_id_fkey1"
		}),
	unique("users_email_unique").on(table.email),
]);

export const enrollments = pgTable("enrollments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	courseId: uuid("course_id").notNull(),
	enrolledAt: timestamp("enrolled_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "enrollments_user_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.courseId],
			foreignColumns: [courses.id],
			name: "enrollments_course_id_courses_id_fk"
		}),
]);

export const sectionProgress = pgTable("section_progress", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	sectionId: uuid("section_id").notNull(),
	progressPercent: integer("progress_percent").default(0),
	isCompleted: boolean("is_completed").default(false),
	completedAt: timestamp("completed_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "section_progress_user_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.sectionId],
			foreignColumns: [courseSections.id],
			name: "section_progress_section_id_course_sections_id_fk"
		}),
]);

export const sectionQuizzes = pgTable("section_quizzes", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	sectionId: uuid("section_id").notNull(),
	type: text().notNull(),
	question: text().notNull(),
	choices: jsonb(),
	correctAnswer: text("correct_answer"),
	order: integer(),
	points: integer().default(1),
	isRequired: boolean("is_required").default(true),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.sectionId],
			foreignColumns: [courseSections.id],
			name: "section_quizzes_section_id_course_sections_id_fk"
		}),
]);

export const sectionVideos = pgTable("section_videos", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	sectionId: uuid("section_id").notNull(),
	title: text().notNull(),
	videoUrl: text("video_url").notNull(),
	durationSeconds: integer("duration_seconds"),
	order: integer(),
	description: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.sectionId],
			foreignColumns: [courseSections.id],
			name: "section_videos_section_id_course_sections_id_fk"
		}),
]);

export const topics = pgTable("topics", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: text().notNull(),
	description: text(),
	userId: uuid("user_id").notNull(),
	repliesCount: integer("replies_count").default(0),
	lastReplyAt: timestamp("last_reply_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "topics_user_id_fkey"
		}).onDelete("cascade"),
]);

export const roles = pgTable("roles", {
	id: serial().primaryKey().notNull(),
	roleName: varchar("role_name", { length: 50 }).notNull(),
	description: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

export const posts = pgTable("posts", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	topicId: uuid("topic_id").notNull(),
	userId: uuid("user_id").notNull(),
	content: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.topicId],
			foreignColumns: [topics.id],
			name: "posts_topic_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "posts_user_id_fkey"
		}).onDelete("cascade"),
]);

export const competencyCategories = pgTable("competency_categories", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	description: text(),
}, (table) => [
	unique("competency_categories_name_key").on(table.name),
]);

export const competencies = pgTable("competencies", {
	id: serial().primaryKey().notNull(),
	categoryId: integer("category_id").notNull(),
	name: varchar({ length: 255 }).notNull(),
	description: text(),
}, (table) => [
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [competencyCategories.id],
			name: "competencies_category_id_fkey"
		}).onDelete("cascade"),
]);

export const quizResponses = pgTable("quiz_responses", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	quizId: uuid("quiz_id").notNull(),
	answer: text().notNull(),
	isCorrect: boolean("is_correct"),
	pointsEarned: integer("points_earned").default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "quiz_responses_user_id_fkey"
		}),
	foreignKey({
			columns: [table.quizId],
			foreignColumns: [sectionQuizzes.id],
			name: "quiz_responses_quiz_id_fkey"
		}),
]);

export const sectionContents = pgTable("section_contents", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	sectionId: uuid("section_id").notNull(),
	type: text().notNull(),
	title: text().notNull(),
	contentUrl: text("content_url").notNull(),
	order: integer().default(0),
	deskripsi: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.sectionId],
			foreignColumns: [courseSections.id],
			name: "section_contents_section_id_fkey"
		}),
]);

export const courseProgress = pgTable("course_progress", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	courseId: uuid("course_id").notNull(),
	sectionId: uuid("section_id"),
	progressPercent: integer("progress_percent").default(0),
	completedAt: timestamp("completed_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "course_progress_user_id_fkey"
		}),
	foreignKey({
			columns: [table.courseId],
			foreignColumns: [courses.id],
			name: "course_progress_course_id_fkey"
		}),
	foreignKey({
			columns: [table.sectionId],
			foreignColumns: [courseSections.id],
			name: "course_progress_section_id_fkey"
		}),
	check("course_progress_progress_percent_check", sql`(progress_percent >= 0) AND (progress_percent <= 100)`),
]);

export const assessment = pgTable("assessment", {
	id: serial().primaryKey().notNull(),
	competencyId: integer("competency_id").notNull(),
	question: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.competencyId],
			foreignColumns: [competencies.id],
			name: "assessment_competency_id_fkey"
		}),
]);

export const assessmentAnswers = pgTable("assessment_answers", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	answers: jsonb().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});

export const categories = pgTable("categories", {
	id: char({ length: 36 }).primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	slug: varchar({ length: 100 }).notNull(),
}, (table) => [
	unique("categories_slug_key").on(table.slug),
]);
