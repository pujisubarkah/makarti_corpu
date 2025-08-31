import { pgTable, serial, integer, varchar, timestamp } from 'drizzle-orm/pg-core'

export const certificates = pgTable('certificates', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull(),
  course_id: integer('course_id').notNull(),
  url: varchar('url', { length: 255 }),
  issued_at: timestamp('issued_at').defaultNow().notNull(),
})
