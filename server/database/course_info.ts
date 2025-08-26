import { pgTable, uuid, varchar, integer, boolean, timestamp } from 'drizzle-orm/pg-core'
import { courses } from './courses'

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
})