import { pgTable, uuid, timestamp, integer, boolean } from 'drizzle-orm/pg-core'
import { users } from './users'
import { courseSections } from './course_section'

export const sectionProgress = pgTable('section_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull().references(() => users.id),
  section_id: uuid('section_id').notNull().references(() => courseSections.id),
  progress_percent: integer('progress_percent').default(0), // 0-100
  is_completed: boolean('is_completed').default(false),
  completed_at: timestamp('completed_at'), // null
})
