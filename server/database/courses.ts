import { pgTable, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { users } from './users';

export const courses = pgTable('courses', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  thumbnail_url: text('thumbnail_url'),
  instructor_id: uuid('instructor_id').notNull().references(() => users.id),
  created_at: timestamp('created_at').defaultNow(),
  is_published: boolean('is_published').default(false).notNull(),
});