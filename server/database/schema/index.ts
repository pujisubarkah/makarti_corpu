
import { pgTable, uuid, text, integer, timestamp, boolean, varchar, jsonb, serial } from 'drizzle-orm/pg-core';

// USERS
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  password_hash: text('password_hash').notNull(),
  full_name: text('full_name').notNull(),
  created_at: timestamp('created_at').defaultNow(),
  role_id: integer('role_id').notNull(),
  nip: varchar('nip', { length: 64 }),
  is_active: boolean('is_active').default(true).notNull(),
  avatar_seed: text('avatar_seed')
});

// COURSES
export const courses = pgTable('courses', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  thumbnail_url: text('thumbnail_url'),
  instructor_id: uuid('instructor_id').notNull().references(() => users.id),
  created_at: timestamp('created_at').defaultNow(),
  is_published: boolean('is_published').default(false).notNull(),
  competency_id: integer('competency_id').references(() => competencies.id),
});

// COURSE INFO
export const course_info = pgTable('course_info', {
  id: uuid('id').primaryKey().defaultRandom(),
  course_id: uuid('course_id').references(() => courses.id).notNull(),
  level: varchar('level', { length: 50 }).notNull(),
  duration: integer('duration').notNull(),
  language: varchar('language', { length: 50 }).notNull(),
  mode: varchar('mode', { length: 50 }).notNull(),
  certificate: boolean('certificate').default(false),
  mobile_friendly: boolean('mobile_friendly').default(true),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow()
});

// ENROLLMENTS
export const enrollments = pgTable('enrollments', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').references(() => users.id).notNull(),
  course_id: uuid('course_id').references(() => courses.id).notNull(),
  enrolled_at: timestamp('enrolled_at', { withTimezone: true }).defaultNow(),
});

// NOTIFICATIONS
export const notifikasi = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull(),
  pesan: text('pesan').notNull(),
  dibaca: boolean('dibaca').default(false).notNull(),
  created_by: uuid('created_by').notNull()
});


export const sectionProgress = pgTable('section_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull().references(() => users.id),
  section_id: uuid('section_id').notNull().references(() => courseSections.id),
  progress_percent: integer('progress_percent').default(0), // 0-100
  is_completed: boolean('is_completed').default(false),
  completed_at: timestamp('completed_at'), // null
})


export const courseSections = pgTable('course_sections', {
  id: uuid('id').primaryKey().defaultRandom(),
  course_id: uuid('course_id').notNull().references(() => courses.id),
  title: text('title').notNull(),
  order: integer('order'),
  created_at: timestamp('created_at').defaultNow(),
});

export const sectionQuizzes = pgTable('section_quizzes', {
  id: uuid('id').primaryKey().defaultRandom(),
  section_id: uuid('section_id').notNull().references(() => courseSections.id),
  type: text('type').notNull(), // 'multiple', 'short', 'truefalse', 'fill', 'likert'
  question: text('question').notNull(), // Pertanyaan quiz
  choices: jsonb('choices'), // Array pilihan untuk multiple choice: ["A", "B", "C", "D"]
  correct_answer: text('correct_answer'), // Jawaban benar (index untuk multiple, text untuk lainnya)
  order: integer('order'), // Urutan quiz dalam section
  points: integer('points').default(1), // Point/nilai quiz
  is_required: boolean('is_required').default(true), // Wajib dijawab atau tidak
  created_at: timestamp('created_at').defaultNow(),
});

export const sectionVideos = pgTable('section_videos', {
  id: uuid('id').primaryKey().defaultRandom(),
  section_id: uuid('section_id').notNull().references(() => courseSections.id),
  title: text('title').notNull(),
  video_url: text('video_url').notNull(), // URL YouTube, Mux, dll.
  duration_seconds: integer('duration_seconds'), // durasi video dalam detik
  order: integer('order'), // urutan video dalam section
  description: text('description'), // opsional: deskripsi video
  created_at: timestamp('created_at').defaultNow(),
});

export const competencies = pgTable('competencies', {
  id: integer('id').primaryKey(),
  category_id: integer('category_id').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description')
});

export const competency_categories = pgTable('competency_categories', {
  id: integer('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description')
});

export const sectionContents = pgTable('section_contents', {
  id: uuid('id').primaryKey().defaultRandom(),
  section_id: uuid('section_id').notNull().references(() => courseSections.id),
  type: text('type').notNull(), // 'video', 'pdf', 'paparan', 'embed', etc.
  title: text('title').notNull(),
  content_url: text('content_url').notNull(), // link ke video/pdf/slide/paparan
  order: integer('order'),
  created_at: timestamp('created_at').defaultNow(),
  deskripsi: text('deskripsi'), // Tambahkan kolom deskripsi
});

export const assessment = pgTable("assessment", {
  id: serial("id").primaryKey(), // id otomatis bertambah
  competency_id: integer("competency_id")
    .notNull()
    .references(() => competencies.id),
  question: text("question").notNull(),
});

export const assessment_answers = pgTable("assessment_answers", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull(), // siapa yang menjawab
  answers: jsonb("answers").notNull(),   // semua jawaban dalam 1 JSON
  created_at: timestamp("created_at").defaultNow(),
});

export const quizResponses = pgTable('quiz_responses', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull().references(() => users.id),
  quiz_id: uuid('quiz_id').notNull().references(() => sectionQuizzes.id),
  answer: text('answer').notNull(), // Jawaban user
  is_correct: boolean('is_correct'), // Apakah jawaban benar (null untuk likert)
  points_earned: integer('points_earned').default(0),
  created_at: timestamp('created_at').defaultNow(),
});


export const courseProgress = pgTable('course_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull().references(() => users.id),
  course_id: uuid('course_id').notNull().references(() => courses.id),
  section_id: uuid('section_id').references(() => courseSections.id), // opsional, track per section
  progress_percent: integer('progress_percent').default(0), // 0-100
  completed_at: timestamp('completed_at'), // null artinya belum selesai
});


