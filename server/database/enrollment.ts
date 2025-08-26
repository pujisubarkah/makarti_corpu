// server/database/enrollments.ts
import { pgTable, uuid, timestamp, primaryKey } from 'drizzle-orm/pg-core'
import { users } from './users'
import { courses } from './courses'

export const enrollments = pgTable('enrollments', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').references(() => users.id).notNull(),
  course_id: uuid('course_id').references(() => courses.id).notNull(),
  enrolled_at: timestamp('enrolled_at', { withTimezone: true }).defaultNow(),
})
