import { pgTable, uuid, timestamp, integer } from 'drizzle-orm/pg-core';
import { users } from './users';
import { courses } from './courses';
import { courseSections } from './course_section';

// Tabel progress pembelajaran per user per course dan section
export const courseProgress = pgTable('course_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull().references(() => users.id),
  course_id: uuid('course_id').notNull().references(() => courses.id),
  section_id: uuid('section_id').references(() => courseSections.id), // opsional, track per section
  progress_percent: integer('progress_percent').default(0), // 0-100
  completed_at: timestamp('completed_at'), // null artinya belum selesai
});
